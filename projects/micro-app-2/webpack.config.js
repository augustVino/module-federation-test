const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { ModuleFederationPlugin } = require('webpack').container;
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

const path = require('path');
const crypto = require('crypto');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    port: 8002,
    static: path.join(__dirname, 'dist'),
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  output: {
    publicPath: 'auto'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              importLoaders: 1,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith('.module.less'),
                // localIdentName: '[local]__[hash:8]',
                getLocalIdent: (context, localIdentName, localName, options) => {
                  // 返回一个包含文件路径和名称的更具体的哈希
                  //   return `${localName}-${context.resourcePath}`;
                  const hash = crypto.createHash('sha1');
                  hash.update(context.resourcePath + localName);
                  return `${localName}-${hash.digest('hex').slice(0, 8)}`;
                }
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader')
          }
        ]
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'microApp2',
      //   filename: 'remoteEntry.js',
      exposes: {
        './App': './src/exposes'
      },
      shared: {
        react: {
          singleton: true
        },
        'react-dom': {
          singleton: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
