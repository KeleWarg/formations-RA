import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Formations Font ───────────────────────────────
      fontFamily: {
        sans: ["Gilroy", "sans-serif"],
        gilroy: ["Gilroy", "sans-serif"],
        euclid: ["Euclid Circular B", "sans-serif"],
      },

      // ─── Formations Colors ─────────────────────────────
      colors: {
        primary: {
          50: "#F5F5FF",
          100: "#D3C9FF",
          200: "#BEA4FF",
          300: "#937DE8",
          400: "#6C4AE1",
          500: "#4817C2", // Brand primary
          600: "#35118F",
          700: "#1B0948",
          800: "#10052B",
        },
        secondary: {
          50: "#F2F7F0",
          100: "#D3EBD9",
          200: "#A9D6B7",
          300: "#71C78C",
          400: "#4BA375",
          500: "#2F7F51", // Brand secondary (green)
          600: "#005A44",
          700: "#143A3A",
          800: "#143A3A",
        },
        tertiary: {
          50: "#FFF8F5",
          100: "#FFEFE0",
          200: "#F2D7AE",
          300: "#EDC385",
          400: "#F3C060",
        },
        quaternary: {
          50: "#FAF1F0",
          100: "#FCE0DE",
          200: "#F7C0BC",
          300: "#ED908A",
          400: "#E05166",
          500: "#CA1643",
          600: "#A91B34",
          700: "#7A0F2A",
          800: "#381B21",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#E5E5E5",
          200: "#A7A7B0",
          300: "#8E8E96",
          400: "#606064",
          500: "#4C4C53",
          600: "#313132",
          700: "#252526",
          800: "#171614",
        },
        // Semantic aliases
        brand: {
          primary: "#4817C2",
          secondary: "#2F7F51",
          neutral: "#171614",
        },
        text: {
          "dark-blue": "#002142",
          "secondary-blue": "#243443",
        },
        outline: "#DFDFDF",
        "bonus-bg": "#F1FFFC", // Light green for bonus callout
        "info-bg": "#F1F5F9", // Slate for info banner
      },

      // ─── Formations Spacing ────────────────────────────
      spacing: {
        "2xs": "2px",
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
        "4xl": "48px",
      },

      // ─── Formations Border Radius ─────────────────────
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },

      // ─── Formations Shadows ────────────────────────────
      boxShadow: {
        card: "0px 4px 4px 0px rgba(0,0,0,0.09)",
        header: "0px 2px 2px 0px rgba(0,0,0,0.04)",
        "header-alt": "0px 6px 9px 0px rgba(0,0,0,0.06)",
        button: "0px 4px 16px 0px rgba(0,0,0,0.08)",
        input: "0px 1px 4.3px 0px rgba(0,0,0,0.1)",
        lg: "0px 5px 12px 6px rgba(0,0,0,0.1)",
        md: "0px 4px 6px 6px rgba(0,0,0,0.04)",
        sticky: "0px -2px 28px 0px rgba(0,0,0,0.24)",
      },

      // ─── Formations Typography ─────────────────────────
      fontSize: {
        // Desktop sizes mapped to responsive Tailwind
        "heading-lg": ["64px", { lineHeight: "76px" }],
        "heading-md": ["56px", { lineHeight: "68px" }],
        "heading-sm": ["48px", { lineHeight: "58px" }],
        "title-lg": ["40px", { lineHeight: "52px", letterSpacing: "0px" }],
        "title-md": ["36px", { lineHeight: "42px" }],
        "title-sm": ["24px", { lineHeight: "32px" }],
        "title-xs": ["20px", { lineHeight: "30px" }],
        "body-lg": ["18px", { lineHeight: "28px" }],
        "body-md": ["16px", { lineHeight: "24px" }],
        "body-sm": ["14px", { lineHeight: "22px" }],
        "body-xs": ["12px", { lineHeight: "18px" }],
      },

      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      letterSpacing: {
        tighter: "-0.2px",
        tight: "-0.1px",
        normal: "0px",
        wide: "0.5px",
        wider: "1px",
      },

      // ─── Formations Grid ──────────────────────────────
      screens: {
        mobile: "390px",
        tablet: "744px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
