import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
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
      transitionDelay: {
        "5000": "5000ms",
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
        text: {
          to: {
            backgroundPosition: "200% center",
          },
        },
      },
      animation: {
        "text-gradient": "text 1.5s linear infinite",
        "loader-circle": "loader_circle .5s alternate infinite ease",
        "lodaer-shadow": "loader_shadow .5s alternate infinite ease",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        typing: "typing 2s steps(22), blink .5s step-end infinite alternate",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".underlineAnimation": {
          backgroundPosition: "0% 100%",
          backgroundRepeat: "no-repeat",
          transitionProperty: "background-size",
          transitionTimingFunction: "linear",
          transitionDuration: "200ms",
          backgroundSize: "0% 2px",
          backgroundImage:
            "linear-gradient(to right, var(--tw-gradient-stops))",
          "--tw-gradient-from":
            "hsl(var(--primary)) var(--tw-gradient-from-position)",
          "--tw-gradient-stops":
            "var(--tw-gradient-from), var(--tw-gradient-to)",
          "--tw-gradient-to":
            "hsl(var(--primary)) var(--tw-gradient-to-position)",
          "&:hover": {
            backgroundSize: "100% 2px",
          },
        },
        ".dashedBackground": {
          backgroundImage:
            "radial-gradient(#000 5%, #0000 6%), radial-gradient(#000 5%, #0000 6%)",
          backgroundPosition: "0 0, calc(var(3rem) / 2) calc(var(3rem) / 2)",
          backgroundSize: "3rem 3rem",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
