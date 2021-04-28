const { merge } = require('webpack-merge')
const HtmlWebpackPLugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = { 
    mode: 'production', // makes sure JS files are optimised and minified
    output: {
        filename: '[name].[contenthash].js' // whenever we build some files for production every file uses this template for naming
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ]

}

// Prod config overrides any already set options in common config
module.exports = merge(commonConfig, prodConfig)