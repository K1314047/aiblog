import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { maxWidth: { reading: "760px" }, boxShadow: { soft: "0 10px 30px rgba(0,0,0,0.06)" } } },
  plugins: []
} satisfies Config;
