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
                test: /\.css$/,
                loader: "style-loader"
              },
              {
                test: /\.css$/,
                loader: "css-loader",
                query: {
                  modules: true,
                  localIdentName: "[name]__[local]___[hash:base64:5]"
                }
              },
            {
                test: /\.(jpe?g|png|gif|svg|ttf)$/i,
                exclude: [
                    path.resolve(__dirname, './node_modules'),
                ],
                use: [
                    {
                        loader: 'url-loader',
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
            'Types': path.resolve(__dirname, 'app/types'),
            'Helpers': path.resolve(__dirname, 'app/helpers'),
            'Common': path.resolve(__dirname, 'app/components/common'),
            'Selectors': path.resolve(__dirname, 'app/selectors'),
        }
    },
    devtool: 'source-map'
}