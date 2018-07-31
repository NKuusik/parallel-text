const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/parallel_text.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:  [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
   module: {
     rules: [
       {
        test: /\.scss$/,
         use: [
           {
             loader: MiniCssExtractPlugin.loader,
             options: {
               publicPath: '../'
             }
          },
           'css-loader', 'sass-loader'
         ]
       }
     ]
   }
};
