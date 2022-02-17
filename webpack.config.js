module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "entry",
              },
            ],
          ],
        },
        exclude: ["/node_modules"],
      },
    ],
  },
  mode: "development",
};
