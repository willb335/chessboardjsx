const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.module\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true, camelCase: true } }
        ]
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(['dist'])]
};
