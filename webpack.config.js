const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const fs = require('fs');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map((item) => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false
    });
  });
}

const htmlPlugins = generateHtmlPlugins('./src/html/views');

module.exports = {
  entry: ['./src/js/index.js', './src/js/index2.js', './src/scss/style.scss'],
  output: {
    filename: './js/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: [{
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
              formatter: eslintFriendlyFormatter,
              configFile: '.eslintrc'
            }
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html/includes'),
        use: ['raw-loader']
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/img/svg'),
        use: [{
            loader: 'svg-sprite-loader'
          },
          {
            loader: 'svgo-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Your website is running here: http://localhost:8080']
      }
    }),
    new ExtractTextPlugin({
      filename: './css/style.bundle.css',
      allChunks: true
    }),
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{
        from: './src/fonts',
        to: './fonts'
      },
      {
        from: './src/media',
        to: './media'
      },
      {
        from: './src/favicon',
        to: './favicon'
      },
      {
        from: './src/img',
        to: './img'
      }
    ]),
    new SpriteLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    })
  ].concat(htmlPlugins),
  devServer: {
    quiet: true,
    overlay: {
      warnings: false,
      errors: true
    }
  }
};
