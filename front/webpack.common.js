const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/main.js',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        title: 'Parallel text',
        filename: 'index.html',
        template: 'src/index.html'
      }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    })
  ],
  output: {
    filename: '[name].bundle.js',
    assetModuleFilename: 'texts/[hash][ext][query]',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "vue-style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                // Enabling the legacy JS API for Sass
                silenceDeprecations: ['legacy-js-api']
              },
            },
          }
        ],
      },
      {
        test: /\.csv$/,
        loader: 'file-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
  },
};