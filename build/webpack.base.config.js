const path = require("path");
const webpack = require("webpack");

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
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};