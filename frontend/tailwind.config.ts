import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      colors: {
        brand: {
          primary: "#0084d6",
          hover: "#0075be",
          dark: "#000000",
          body: "#333333",
          surface: "#f5f7f9",
          navy: "#243673",
          sky: "#BFD1FF",
        },
        notice: {
          bg: "#fff3cd",
          border: "#ffeeba",
          text: "#856404",
        },
      },
      fontFamily: {
        sans: ["var(--font-lato)", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
