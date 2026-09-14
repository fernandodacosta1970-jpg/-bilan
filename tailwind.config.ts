import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B2A4A",
        accent: "#D9A62E",
        paper: "#FAF9F6",
        slate: "#5B6472",
        line: "#E4E1D9",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-plex)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
