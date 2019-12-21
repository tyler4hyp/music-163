const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

const config = merge(base, {
    entry: {
        app: './src/client-entry.js'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                'css-hot-loader',
                isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                'css-loader',
                'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        // alias: {
        //     'create-api': './create-api-client.js'
        // }
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new MiniCssExtractPlugin({
            filename: 'common.[chunkhash].css'
        }),
        new VueSSRClientPlugin()
    ],
    optimization: {
        // extract webpack runtime & manifest to avoid vendor chunk hash changing
        // on every build.
        runtimeChunk: {
            name: 'manifest'
        },
        // extract vendor chunks for better caching
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
})



module.exports = config