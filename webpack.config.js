module.exports = {
  entry: ["./src/js/index.ts"],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: ["/node_modules/"],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-typescript",
                  {
                    allowDeclareFields: true,
                  },
                ],
              ],
              plugins: ["@babel/plugin-transform-react-jsx"],
            },
          },
        ],
      },
    ],
  },

  mode: "development",
};
