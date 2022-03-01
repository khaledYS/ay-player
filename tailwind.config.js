module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./src/*.{html,js,jsx}"],
  theme: {
    extend: {},
    screens: {
      'lgg' : {'max': '950px'},
      'md' : {'max': '850px'},
      'sm' : {'max': '750px'},
      'smm' : {'max': '600px'}
    }
  },
  plugins: [
    require("daisyui")
  ],
}
