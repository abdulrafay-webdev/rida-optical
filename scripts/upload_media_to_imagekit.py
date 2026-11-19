import os
import sys
import json
import base64
import time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import httpx

PRIVATE_KEY = "private_nlbcxBAanGn/Mth6NwWLN5W3vFY="
BASE_DIR = Path(r"E:\rida opt\Rida-Optical-Migration\extracted\wordpress-files\wp-content\uploads")
MANIFEST_PATH = Path(r"E:\rida opt\Rida-Optical-Migration\extracted\media_manifest.json")
PROGRESS_CACHE = Path(r"E:\rida opt\Rida-Optical-Migration\extracted\imagekit_uploaded.json")

AUTH_HEADER = "Basic " + base64.b64encode(f"{PRIVATE_KEY}:".encode()).decode()

def load_uploaded_cache() -> set:
    if PROGRESS_CACHE.exists():
        try:
            with open(PROGRESS_CACHE, "r", encoding="utf-8") as f:
                return set(json.load(f))
        except Exception:
            return set()
    return set()

def save_uploaded_cache(uploaded: set):
    with open(PROGRESS_CACHE, "w", encoding="utf-8") as f:
        json.dump(sorted(list(uploaded)), f, indent=2)

def upload_single_file(item: dict, client: httpx.Client) -> tuple[str, bool, str]:
    rel_path = item["original_source_path"].replace("\\", "/")
    full_local_path = BASE_DIR / rel_path

    if not full_local_path.exists():
        return rel_path, False, "File not found locally"

    file_name = full_local_path.name
    folder_part = str(Path(rel_path).parent).replace("\\", "/")
    folder = f"/{folder_part}" if folder_part and folder_part != "." else "/"

    mime_type = item.get("mime_type", "image/jpeg")

    for attempt in range(1, 4):
        try:
            with open(full_local_path, "rb") as f:
                file_bytes = f.read()

            files = {"file": (file_name, file_bytes, mime_type)}
            data = {
                "fileName": file_name,
                "folder": folder,
                "useUniqueFileName": "false",
                "overwriteFile": "false",
            }

            resp = client.post(
                "https://upload.imagekit.io/api/v1/files/upload",
                headers={"Authorization": AUTH_HEADER},
                data=data,
                files=files,
                timeout=45.0,
            )

            if resp.status_code == 200:
                return rel_path, True, "Uploaded (200 OK)"
            elif resp.status_code == 400 and "already exists" in resp.text.lower():
                return rel_path, True, "Already exists on ImageKit"
            else:
                if attempt == 3:
                    return rel_path, False, f"HTTP {resp.status_code}: {resp.text[:100]}"
                time.sleep(1.5 * attempt)
        except Exception as e:
            if attempt == 3:
                return rel_path, False, f"Exception: {str(e)}"
            time.sleep(1.5 * attempt)

    return rel_path, False, "Exhausted retries"

def main():
    if not MANIFEST_PATH.exists():
        print("Manifest not found:", MANIFEST_PATH)
        return

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    uploaded_set = load_uploaded_cache()
    # Mark the two test files we already uploaded manually
    uploaded_set.add("2025/07/1000424554-scaled.jpg")
    uploaded_set.add("2026/06/1000185251.jpg")

    # Priority sorting: products, categories, branding first
    def priority_key(it):
        role = it.get("functional_role", "")
        if "product" in role:
            return 0
        if "category" in role:
            return 1
        if "branding" in role or "hero" in role:
            return 2
        return 3

    manifest.sort(key=priority_key)

    to_upload = [it for it in manifest if it["original_source_path"].replace("\\", "/") not in uploaded_set]
    print(f"Total manifest assets: {len(manifest)}")
    print(f"Already uploaded: {len(uploaded_set)}")
    print(f"Pending upload: {len(to_upload)}")

    if not to_upload:
        print("All assets already uploaded!")
        return

    success_count = 0
    fail_count = 0

    with httpx.Client(timeout=45.0) as client:
        with ThreadPoolExecutor(max_workers=5) as executor:
            future_to_item = {
                executor.submit(upload_single_file, it, client): it
                for it in to_upload
            }

            for idx, future in enumerate(as_completed(future_to_item), 1):
                rel_path, ok, msg = future.result()
                if ok:
                    success_count += 1
                    uploaded_set.add(rel_path)
                    print(f"[{idx}/{len(to_upload)}] OK: {rel_path} -> {msg}")
                else:
                    fail_count += 1
                    print(f"[{idx}/{len(to_upload)}] FAIL: {rel_path} -> {msg}")

                if idx % 10 == 0:
                    save_uploaded_cache(uploaded_set)

    save_uploaded_cache(uploaded_set)
    print("\n--- UPLOAD FINISHED ---")
    print(f"Success: {success_count}, Failed: {fail_count}, Total uploaded in cache: {len(uploaded_set)}")

if __name__ == "__main__":
    main()
