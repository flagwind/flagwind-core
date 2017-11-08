const path = require("path");
const webpack = require("webpack");

const package = require("../package.json");
const version = process.env.VERSION || package.version;

// 头部版权 BEGIN
const banner = `${package.name} ${version}
${package.description}
${package.homepage}

Released under the ${package.license} license.
Copyright (C) 2010-${new Date().getFullYear()} Flagwind Inc. All rights reserved. `
// 头部版权 END

function resolve(dir)
{
    return path.join(__dirname, "..", dir);
}

module.exports =
{
    module:
    {
        rules:
        [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: 
    {
        extensions: [".ts", ".js"],
        alias: 
        {
            "src": resolve("src")
        }
    },
    plugins: 
    [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.BannerPlugin(banner)
    ]
};