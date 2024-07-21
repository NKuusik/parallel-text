const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { watchFile } = require('fs');

module.exports = {
  mode: 'development',
  entry: './src/parallel_text.js',
  devtool: 'inline-source-map',
  devServer: {
    watchFiles: ["./src/**"],
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Parallel text',
        filename: 'index.html',
        template: 'src/index.html'
      })
  ],
  output: {
    filename: '[name].bundle.js',
    assetModuleFilename: 'texts/[hash][ext][query]',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.txt$/i,
        type: 'asset/resource',
        generator: {
          filename: 'texts/[name][ext]', // Maintain the original name and extension
        },
      }
    ],
  },
};