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
        background: "#080705",
        "background-secondary": "#100e0b",
        cream: "rgba(245, 237, 224, 0.92)",
        "cream-muted": "rgba(245, 237, 224, 0.58)",
        "gold-antique": "#c9a96e",
        "gold-champagne": "#e2c898",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)"],
        sans: ["var(--font-dm-sans)"],
      },
      backgroundImage: {
        "gradient-radial-hero": "radial-gradient(circle, #100806 0%, #080705 100%)",
        "gradient-gold": "linear-gradient(to right, #c9a96e, #e2c898)",
        "gradient-text-gold": "linear-gradient(to bottom, #f5ede0 60%, #c9a96e 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
