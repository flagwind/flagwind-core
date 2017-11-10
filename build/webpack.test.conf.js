const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf");

module.exports = merge(baseConfig,
{
    plugins:
    [
        new webpack.DefinePlugin
        ({
            "process.env.NODE_ENV": "testing"
        })
    ]
});