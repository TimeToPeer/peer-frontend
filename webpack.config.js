var path = require('path');
var webpack = require('webpack');
var BUILD_DIR = path.resolve(__dirname, 'dist/');

module.exports = {
    mode: 'development',
    entry: './app/index.tsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
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
                test: /\.(jpe?g|png|gif|svg|ttf)$/i,
                exclude: [
                    path.resolve(__dirname, './node_modules'),
                ],
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'Assets': path.resolve(__dirname, 'public/assets'),
            'Styles': path.resolve(__dirname, 'app/styles'),
            'Components': path.resolve(__dirname, 'app/components'),
            'Constants': path.resolve(__dirname, 'app/constants'),
            'Actions': path.resolve(__dirname, 'app/actions'),
            'Reducers': path.resolve(__dirname, 'app/reducers'),
            'Types': path.resolve(__dirname, 'app/types')
        }
    },
    devtool: 'inline-source-map'
}