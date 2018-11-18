const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const path = require('path');

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/public'));

app.use(webpackDevMiddleware(compiler, {
    hot:true,
    filename: "bundle.js",
    publicPath: '/',
    stats: {
        colors:true,
    },
    historyApiFallback: true,
}));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

const server = app.listen(3000, function() {
    const port = server.address().port;
    console.log('listening on port: ', port);
})