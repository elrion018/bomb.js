module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  ie: '10',
                },
                modules: false,
                useBuiltIns: 'entry',
              },
            ],
          ],
        },
        exclude: ['/node_modules'],
      },
    ],
  },
  target: ['es5', 'web'],
  mode: 'development',
};
