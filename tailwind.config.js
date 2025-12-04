export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "rgb(0 124 138 / 0.1)",
          200: "rgba(153, 203, 208, 1)",
          500: "rgb(0 124 138 / 1)",
          600: "rgba(0, 99, 110, 1)",
          DEFAULT: "rgb(0 124 138 / 1)",
        },

        success: {
          50: "rgb(233 241 238 / 0.48)",
          100: "rgb(31 119 83 / 0.1)",
          150: "rgb(233 241 238 / 1)",
          500: "rgb(31 119 83 / 1)",
          DEFAULT: "rgb(31 119 83 / 1)",
        },
      
        green: {
          100: "rgb(244 248 247 / 1)",
          500: "rgb(31 119 83 / 1)",
        },
      
        warning: {
          100: "rgb(247 242 231 / 1)",
          500: "rgb(173 127 12 / 1)",
          DEFAULT: "rgb(173 127 12 / 1)",
        },
      
        yellow: {
          100: "rgb(247 242 231 / 1)",
          500: "rgb(173 127 12 / 1)",
        },
      
        error: {
          100: "rgb(249 234 233 / 1)",
          500: "rgb(193 43 32 / 1)",
          DEFAULT: "rgb(193 43 32 / 1)",
        },
      
        danger: {
          100: "rgb(249 234 233 / 1)",
          500: "rgb(193 43 32 / 1)",
          DEFAULT: "rgb(193 43 32 / 1)",
        },
      
        information: {
          500: "rgb(20 109 146 / 1)",
          DEFAULT: "rgb(20 109 146 / 1)",
        },
      
        blue: {
          100: "rgb(231 240 244 / 1)",
        },
      
        "deep-blue": "rgb(10 24 97 / 1)",
      
        neutral: {
          100: "rgb(196 201 202 / 1)",
          150: "rgba(191, 191, 191)",
          lightest: "rgba(240, 240, 241, 1)",
          light: "rgba(233, 234, 234, 1)",
          200: "rgb(240 240 241, 0.48)",
          250: "rgb(172 179 180 / 1)",
          300: "rgb(224 224 224 / 1)",
          500: "rgb(98 113 115 / 1)",
          600: '#bfbfbf',
          900: "rgb(0 25 28 / 1)",
          DEFAULT: "rgb(74 91 94 / 1)",
        },
      },      
      borderColor: {
        border: "#E6E6E6",
      },
      backgroundColor: {
        background: "#FFFFFF",
      },
      textColor: {
        text: "#000000",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
}
