var path = require('path');
var webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    filename: "./index.html",
    template: "./index.html"
});
console.log(__dirname);
module.exports = {
    mode: 'development',
    entry: './app/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[hash].bundle.js'
    },
    plugins:[
        htmlWebpackPlugin
    ],
    module: {
        rules: [
            {
                test: /\.ts|.txs?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: [
                    path.resolve(__dirname, './node_modules'),
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: '/',
                            publicPath: path.resolve(__dirname, './dist'),
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'Assets': path.resolve(__dirname, 'app/assets'),
            'Styles': path.resolve(__dirname, 'app/styles'),
            'Components': path.resolve(__dirname, 'app/components'),
            'Constants': path.resolve(__dirname, 'app/constants')
        }
    },
    devtool: 'inline-source-map'
}