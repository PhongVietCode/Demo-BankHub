/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        hero: "url('assets/images/collection-background.svg')",
        card: "url('assets/images/thumbnail-background.svg')",
      },
      screens: {
        wide: "1440px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0.2 },
          "25%": { opacity: 0.4 },
          "50%": { opacity: 0.6 },
          "75%": { opacity: 0.8 },
          "100%": { opacity: 1 },
        },
        bounceY: {
          "0%": {
            transform: 'translateY(50%)',
          },
          "25%": {
            transform: 'translateY(40%)',

          },
          "50%": {
            transform: 'translateY(30%)',
          },
          "75%": {
            transform: 'translateY(20%)'
          },
          "100%": {
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease',
        bounceY: 'bounceY 0.7s ease-out'
      }
    },
  },
  plugins: [],
};
