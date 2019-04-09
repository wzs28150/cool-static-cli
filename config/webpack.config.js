/* jshint esversion: 6 */
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

const PostcssConfigPath = './config/postcss.config.js';
const HappyPack = require('happypack');
const os = require('os');
const ip = require('ip');
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

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

const htmlPlugins = generateHtmlPlugins('../src/html/views');
// console.log(htmlPlugins);return false;
module.exports = {
  entry: ['./src/js/index.js', './src/scss/style.scss'],
  output: {
    filename: './js/cooljs.js'
  },
  devtool: 'source-map',
  externals: {
    jquery: 'jQuery',
    swiper: 'Swiper'
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, '../src/js'),
        use: ['happypack/loader?id=js'],
        exclude: path.resolve(__dirname, '../node_modules')
    },

      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, '../src/scss'),
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
                sourceMap: true,
                config: {
                  path: PostcssConfigPath
                }
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
        include: path.resolve(__dirname, '../src/html/includes'),
        use: ['happypack/loader?id=html']
    },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, '../src/img/svg'),
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
        messages: ['Your website is running here: http://127.0.0.0:8080']
      }
    }),
    new ExtractTextPlugin({
      filename: './css/coolstyle.css',
      allChunks: true
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true'
      }]
    }),
    new HappyPack({
      id: 'html',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'raw-loader?cacheDirectory=true'
      }]
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
        from: './src/js/lib',
        to: './js/lib'
    },
      {
        from: './src/scss/lib',
        to: './css/lib'
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
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      // PhotoSwipe: 'photoswipe',
      // PhotoSwipeUI_Default: 'photoswipe/src/js/ui/photoswipe-ui-default.js'
    })
  ].concat(htmlPlugins),
  devServer: {
    // quiet: true,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // disableHostCheck: true
    quiet: true,
    host: ip.address(),
    // port: 1573, // 端口
    open: true, // 自动打开页面，
    noInfo: true,
    overlay: {
      errors: true, // 编译过程中如果有任何错误，都会显示到页面上
    },
    disableHostCheck: true // 不检查host地址方便局域网访问
  }
};
