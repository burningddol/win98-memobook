import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Windows 98 color palette - classic system colors
        win98: {
          // Core grays
          gray: "#c0c0c0",
          "gray-dark": "#808080",
          "gray-light": "#dfdfdf",
          "gray-darker": "#404040",
          // Accent colors
          navy: "#000080",
          "navy-light": "#1084d0",
          white: "#ffffff",
          black: "#000000",
          teal: "#008080",
          // UI specific
          "btn-face": "#c0c0c0",
          "btn-highlight": "#ffffff",
          "btn-shadow": "#808080",
          "window-frame": "#0a0a0a",
          // Selection
          selection: "#000080",
          "selection-text": "#ffffff",
        },
      },
      fontFamily: {
        win98: ['"MS Sans Serif"', '"Segoe UI"', "Tahoma", "sans-serif"],
        pixel: ['"Courier New"', "monospace"],
      },
      boxShadow: {
        // Win98 raised border effect (outer frame)
        "win98-raised":
          "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
        // Win98 sunken/inset border effect (for inputs, lists)
        "win98-sunken":
          "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080",
        // Win98 button pressed effect
        "win98-pressed":
          "inset 1px 1px #0a0a0a, inset -1px -1px #ffffff, inset 2px 2px #808080, inset -2px -2px #dfdfdf",
        // Window outer frame (more prominent)
        "win98-window":
          "inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff",
        // Subtle raised for title bar buttons
        "win98-btn-small":
          "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
        // Focus outline for buttons
        "win98-focus": "0 0 0 1px #000000",
      },
    },
  },
  plugins: [],
};

export default config;
