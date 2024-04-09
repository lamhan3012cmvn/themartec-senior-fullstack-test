import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "20px",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        h1: [
          "48px",
          { lineHeight: "64px", letterSpacing: "-0.576px", fontWeight: "700" },
        ],
        h2: [
          "30px",
          { lineHeight: "36px", letterSpacing: "-0.225px", fontWeight: "600" },
        ],
        h3: [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.144px", fontWeight: "600" },
        ],
        h4: [
          "20px",
          { lineHeight: "28px", letterSpacing: "-0.1px", fontWeight: "600" },
        ],
        xl: ["20px", { lineHeight: "26px" }],
        lg: ["18px", { lineHeight: "24px" }],
        md: ["16px", { lineHeight: "22px", fontWeight: "400" }],
        xs: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        xxs: ["12px", { lineHeight: "18px", fontWeight: "400" }],
      },
      colors: {
        test: "#FF0000",
        primary: {
          DEFAULT: "rgba(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgba(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        gray: {
          DEFAULT: "rgba(var(--gray))",
          2: "rgba(var(--gray2))",
        },
        black: {
          DEFAULT: "rgba(var(--black))",
        },

        // ===============
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
