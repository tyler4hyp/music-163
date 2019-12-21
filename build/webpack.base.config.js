const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    mode: 'development',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@com': path.resolve(__dirname, '../src/components'),
            '@store': path.resolve(__dirname, '../src/store'),
            '@api': path.resolve(__dirname, '../src/api'),
        }
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: isProd
        ? [
            new VueLoaderPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin(),
        ]
        : [
            new VueLoaderPlugin(),
            new FriendlyErrorsPlugin()
        ]
}