# Rida Optical — Backup Inventory & Integrity Report

## 1. Inventory Summary

This document provides a comprehensive inventory of all source backup archives and extracted website assets for the Rida Optical migration workspace.

All source backup archives were verified for file integrity, checksum parity, and readability prior to project initialization.

---

## 2. Backup Archive Inventory

| Property | Archive 01: Live Production Database | Archive 02: Staging Database | Archive 03: Website Files Archive |
| :--- | :--- | :--- | :--- |
| **Original Filename** | `u684309338_s6XlU.20261102184605.sql.gz` | `u684309338_FkXzS.20261102184605.sql.gz` | `files backup.gz` |
| **Standardized Filename** | `live-database.sql.gz` | `staging-database.sql.gz` | `files-backup.gz` |
| **Exact File Size** | 3,069,321 bytes | 620,744 bytes | 1,912,947,842 bytes |
| **Human-Readable Size** | ~3.07 MB (2.92 MiB) | ~620 KB (606 KiB) | ~1.91 GB (1.78 GiB) |
| **Source Location** | `E:\rida opt\u684309338_s6XlU.20261102184605.sql.gz` | `E:\rida opt\u684309338_FkXzS.20261102184605.sql.gz` | `E:\rida opt\files backup.gz` |
| **Destination Location** | `Rida-Optical-Migration/reference/live-database.sql.gz` | `Rida-Optical-Migration/reference/staging-database.sql.gz` | `Rida-Optical-Migration/reference/files-backup.gz` |
| **Format / Compression** | Gzip compressed SQL dump | Gzip compressed SQL dump | Gzip compressed POSIX TAR |
| **Integrity Verification** | **VERIFIED OK** (0 corrupted blocks) | **VERIFIED OK** (0 corrupted blocks) | **VERIFIED OK** (0 corrupted blocks) |
| **Internal Contents** | 23,054 SQL statements; 80 relational tables | 7,819 SQL statements; 69 relational tables | 8 Hostinger domains container |
| **Extraction Status** | Stored compressed in `reference/` | Stored compressed in `reference/` | Extracted `ridaoptical.com` files to `extracted/wordpress-files/` |

---

## 3. Extracted Assets Inventory

| Detail | Specifications |
| :--- | :--- |
| **Destination Directory** | `Rida-Optical-Migration/extracted/wordpress-files/` |
| **Scope of Extraction** | Filtered specifically to `./domains/ridaoptical.com/public_html/` |
| **Total Archive Members Matching Domain** | 41,505 members |
| **Total Directories Created** | 5,695 directories |
| **Total Files Extracted** | 35,807 files |
| **Total Uncompressed Footprint** | 877,785,520 bytes (~877.78 MB / 0.82 GiB) |
| **Extraction Errors** | 0 errors (all long paths handled using extended Windows path syntax) |

---

## 4. Key Directory & Component Verification

| WordPress Component | Destination Path | Verification Status | Notes |
| :--- | :--- | :--- | :--- |
| **WordPress Core Admin** | `extracted/wordpress-files/wp-admin/` | **Present & Verified** | Core administration scripts |
| **WordPress Core Includes** | `extracted/wordpress-files/wp-includes/` | **Present & Verified** | Core libraries (WP 7.0.8 verified) |
| **WordPress Configuration** | `extracted/wordpress-files/wp-config.php` | **Present & Verified** | Database credentials redacted |
| **Themes Directory** | `extracted/wordpress-files/wp-content/themes/` | **Present & Verified** | Astra, footer-astra-child, twentytwentyfive |
| **Plugins Directory** | `extracted/wordpress-files/wp-content/plugins/` | **Present & Verified** | 33 total plugin folders (WooCommerce 11.2.1) |
| **Uploads / Media** | `extracted/wordpress-files/wp-content/uploads/` | **Present & Verified** | Media folders spanning 2017–2026 |

---

## 5. Security & Verification Attestation

- **Backup Safety:** The original backup files in `E:\rida opt\` remain untouched, intact, and unmodified.
- **Credential Protection:** No passwords, salts, or private API tokens from `wp-config.php` or SQL dumps are published or stored in documentation.
- **Git Protection:** All reference archives and extracted assets are excluded via `.gitignore`.
