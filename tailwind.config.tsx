import type { Config } from "tailwindcss";

const config: Config = {
  // This tells Tailwind to look inside these folders for your buttons and colors
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // These match the professional Navy and Mint theme we want
        primary: "#0a192f",
        accent: "#64ffda",
      },
    },
  },
  plugins: [],
};
export default config;