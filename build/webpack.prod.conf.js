const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf");

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
        filename: "flagwind.min.js",
        library: "flagwind",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    plugins:
    [
        new webpack.DefinePlugin
        ({
            "process.env.NODE_ENV": "production"
        }),
        new webpack.optimize.UglifyJsPlugin
        ({
            output: { comments: false },
            compress:
            {
                warnings: false
            }
        })
    ]
});