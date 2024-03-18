module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        node: "current",
      },
      modules: "auto",
    }],
    "@babel/preset-react"
  ],
  plugins: [
    "babel-plugin-transform-vite-meta-env"
  ]
};

console.log('Babel config file executed');