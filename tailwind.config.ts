import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "var(--main)",
        "light-accent": "var(--light-accent)",
        "dark-accent": "var(--dark-accent)",
        gray: {
          100: "var(--background)",
          200: "var(--dark-accent)",
          300: "var(--dark-accent)",
          400: "var(--dark-accent)",
          500: "var(--foreground)",
          600: "var(--foreground)",
          700: "var(--foreground)",
          800: "var(--background)",
          900: "var(--background)",
        },
        blue: {
          600: "var(--main)",
          700: "var(--light-accent)",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
