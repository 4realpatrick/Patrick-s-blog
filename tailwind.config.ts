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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
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
        typing: {
          from: {
            width: "0",
          },
        },
        loader_circle: {
          "0%": {
            top: "60px",
            height: "5px",
            borderRadius: "50px 50px 25px 25px",
            transform: "scaleX(1.7)",
          },
          "40%": {
            height: "20px",
            borderRadius: "50%",
            transform: "scaleX(1)",
          },
          "100%": {
            top: "0%",
          },
        },
        loader_shadow: {
          "0%": {
            transform: "scaleX(1.5)",
          },
          "40%": {
            transform: "scaleX(1)",
            opacity: "0.7",
          },
          "100%": {
            transform: "scaleX(.2)",
            opacity: "0.4",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
        },
      },
      animation: {
        "loader-circle": "loader_circle .5s alternate infinite ease",
        "lodaer-shadow": "loader_shadow .5s alternate infinite ease",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        typing: "typing 2s steps(22), blink .5s step-end infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
