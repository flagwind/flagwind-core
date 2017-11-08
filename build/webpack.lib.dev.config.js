const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");

process.env.NODE_ENV = "production";

module.exports = merge(baseConfig,
{
    entry:
    {
        main: "./src/flagwind.ts"
    },
    output:
    {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/dist/",
        filename: "flagwind.js",
        library: "flagwind",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    plugins:
    [
        new webpack.DefinePlugin
        ({
            'process.env.NODE_ENV': '"production"'
        })
    ]
});