import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          
        '"Poppins" ',
        '"Space Grotesk"',
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
        quaternary: "var(--quaternary-color)",
        background: "var(--background-color)",
        text: "var(--text1-color)",
        text2: "var(--text2-color)",
        text3: "var(--text3-color)",
        success: "var(--success-color)",
        error: "var(--error-color)",
        warning: "var(--warning-color)",
        danger: "var(--danger-color)",
        info: "var(--info-color)",
        accent: "var(--accent-color)",
        complementary: "var(--complementary-color)",
        active: "var(--active-color)",
        transparent: "var(--transparent-color)",
      },
    },
  },
  darkMode: "class", // Enable dark mode with the 'class' strategy
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          "--success-color": "#01B331", // green-500
          "--error-color": "#DB0C00", // red-500
          "--warning-color": "#FFA000", // yellow-500
          "--danger-color": "#C62828", // red-800
          "--info-color": "#FF7700", // blue-500
          "--accent-color": "#003087", // indigo-500
          "--complementary-color": "#005EB8", // indigo-600
          "--active-color": "#5E72FB", // indigo-650
          "--primary-color": "#F9F9F9", // blue-500
          "--secondary-color": "#FBFBFB", // green-500
          "--tertiary-color": "#FCFCFC", // green-500
          "--quaternary-color": "#FFFFFF", // green-500
          "--background-color": "#F7F7F8", // gray-50
          "--text1-color": "#000000", // BLack
          "--text2-color": "#374151", // gray-700
          "--text3-color": "#6B7280", // gray-500
          //Accent transpatent
          "--transparent-color": "rgba(255,255,255,0.5)",
        },
        // Dark mode
        ".dark": {
          "--success-color": "#61C453",
          "--error-color": "#EF4444",
          "--warning-color": "#E65100", // yellow-500
          "--danger-color": "#C62828", // red-800
          "--info-color": "#3B82F6",
          "--accent-color": "#003087", // indigo-500
          "--complementary-color": "#005EB8", // indigo-600
          "--active-color": "#5E72FB",
          "--primary-color": "#131316",
          "--secondary-color": "#212126",
          "--tertiary-color": "#2B2B2E",
          "--quaternary-color": "#343438",
          "--background-color": "#000000", // dark background color
          "--text1-color": "#FFFFFF",
          "--text2-color": " #9CA3AF",
          "--text3-color":  "#6B7280",
          "--transparent-color": "rgba(0,0,0,0.5) ",
        },
      });
    }),
  ],
};

export default config;
