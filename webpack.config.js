var path = require('path');

var webpack = require('webpack');

var validate = require('webpack-validator');

var CleanWebpackPlugin = require('clean-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var Merge = require('webpack-merge');

var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var PATHS = {
    publicPath: '/reactive/dist/',

    libsPath: path.resolve(process.cwd(), './libs'),

    srcPath: path.resolve(process.cwd(), 'src'),

    node_modulesPath: path.resolve('./node_modules'),
}


var resolve = {
    extensions: ['', '.js', '.css', '.scss', '.ejs', '.png', '.jpg'],

    root: [
        PATHS.node_modulesPath
    ],

    alias: {
        jquery: path.join(PATHS.libsPath, "js/jquery/jquery"),
        underscore: path.join(PATHS.libsPath, "js/underscore/underscore.js"),

        bootstrapcss: path.join(PATHS.libsPath, "css/bootstrap/bootstrap-3.3.5.css"),
        indexcss: path.join(PATHS.srcPath, "css/index.css"),
    }
}

var entry = {
    index: './src/js/index.js',
    common: [
        path.join(PATHS.libsPath, "js/jquery/jquery.js"),
        path.join(PATHS.libsPath, "js/underscore/underscore.js")
    ],
};

var output = {
    path: path.join(__dirname, 'dist'),

    publicPath: PATHS.publicPath,

    filename: 'js/[name].js',

    chunkFilename: 'js/[name].js'
}

var loaders = [
    {
        test: /\.html$/,
        loader: "html"
    },
    {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'url-loader',
        query: {
            limit: 10000,
            name: '/img/[name]-[hash:8].[ext]'
        }
    },
    {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'url-loader',
        query: {
            limit: 5000,
            name: '/font/[name]-[hash:8].[ext]'
        }
    },
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader", {
            publicPath: '../'
        })
    },


];

var plugins = [
    new webpack.DefinePlugin({
        __DEVAPI__: "/devApi/",
    }),
    new webpack.optimize.CommonsChunkPlugin(
        {name: "common", filename: "js/common.js"}
    ),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "_": "underscore"
    }),
    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.OccurenceOrderPlugin(),

    new CleanWebpackPlugin(['dist'], {
        root: '',
        verbose: true,
        dry: false
    }),

    new ExtractTextPlugin("css/[name].css", {allChunks: true}),

    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: __dirname + '/src/index.html',
        inject: 'true',

        chunks: ['common', 'index', 'webpackAssets'],

        chunksSortMode: 'dependency'
    }),

    new HtmlWebpackPlugin({
        filename: 'html/task1.html',
        template: __dirname + '/src/html/task1.html',
        inject: false,
    }),
    new HtmlWebpackPlugin({
        filename: 'html/task2.html',
        template: __dirname + '/src/html/task2.html',
        inject: false,
    }),
    new HtmlWebpackPlugin({
        filename: 'html/task3.html',
        template: __dirname + '/src/html/task3.html',
        inject: false,
    }),
    new HtmlWebpackPlugin({
        filename: 'html/task4.html',
        template: __dirname + '/src/html/task4.html',
        inject: false,
    }),
    new HtmlWebpackPlugin({
        filename: 'html/task5.html',
        template: __dirname + '/src/html/task5.html',
        inject: false,
    }),
];


var config = {
    entry: entry,
    resolveLoader: {root: path.join(__dirname, "node_modules")},
    output: output,
    module: {
        loaders: loaders
    },
    resolve: resolve,
    plugins: plugins,

}

config = Merge(
    config,
    {
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            }),
            new OpenBrowserPlugin({url: 'http://localhost:8080' + PATHS.publicPath + 'index.html'})
        ],
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: "localhost",
            port: "8080",
        }
    }
);

module.exports = validate(config);
