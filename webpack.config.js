var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index.ts"],
  output: {
    path: __dirname + "/public",
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
              plugins: [
                "@babel/plugin-transform-react-jsx",
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        ],
      },
    ],
  },

  devServer: {
    port: 9000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],

  mode: "development",
};
