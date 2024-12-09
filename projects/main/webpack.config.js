const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const path = require('path');
const crypto = require('crypto');

const isPrd = false;

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    port: 8000,
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
        // key: 'moduleLess',
        test: /\.module\.less$/,
        use: [
          isPrd
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: true
                }
              }
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                // getLocalIdent: (context, localIdentName, localName, options) => {
                //   // 返回一个包含文件路径和名称的更具体的哈希
                //   //   return `${localName}-${context.resourcePath}`;
                //   const hash = crypto.createHash('sha1');
                //   hash.update(context.resourcePath + localName);
                //   return `${localName}-${hash.digest('hex').slice(0, 8)}`;
                // },
                namedExport: false,
                /**
                 * 值取决与namedExport，namedExport为 true 默认 as-is，false 默认 camel-case-only
                 * as-is: 类名将按原样导出
                 * camel-case-only: 类名将使用驼峰命名（类名会被改写）
                 */
                exportLocalsConvention: 'as-is',
                localIdentName: !isPrd
                  ? '[path][name]__[local]--[hash:base64:5]'
                  : '[hash:base64:5]'
              },
              sourceMap: !isPrd,
              importLoaders: 2
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'always',
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        // key: 'css&less',
        test: /\.(less|css)$/,
        exclude: [/node_modules/, /\.module.less$/],
        use: [
          isPrd
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: true
                }
              }
            : 'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'always',
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
      name: 'main',
      remotes: {
        microApp1: 'microApp1@http://localhost:8001/mf-manifest.json',
        // microApp1: 'microApp1@http://localhost:8001/remoteEntry.js',
        microApp2: 'microApp2@http://localhost:8002/mf-manifest.json'
        // microApp2: 'microApp2@http://localhost:8002/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
