const ora = require("ora");
const path = require("path");
const webpack = require("webpack");
const rimraf = require("rimraf");
const chalk = require("chalk");
const distPath = path.resolve(__dirname, "../dist");
const webpackDevConfig = require("./webpack.lib.dev.config");
const webpackProdConfig = require("./webpack.lib.prod.config");

const build = function(config)
{
    return new Promise((resolve, reject) => 
    {
        // 使用 webpack 开始构建
        webpack(config, (error, stats) => 
        {
            // 如果构建过程中包含错误，则输出错误信息
            if(error || stats.hasErrors())
            {
                reject(error);
            }
            else
            {
                // 输出构建过程中的统计信息
                process.stdout.write(stats.toString(
                {
                    colors: true, 
                    modules: false, 
                    children: false, 
                    chunks: false, 
                    chunkModules: false
                }) + "\n\n");
                
                resolve(stats);
            }
        });
    });
};

// 启动旋转器
const spinner = ora("building...");
spinner.start();

// 先清空构建目录
rimraf(distPath, (error) =>
{
    if(error)
    {
        throw error;
    }

    const buildDev = build(webpackDevConfig);
    //const buildProd = build(webpackProdConfig);

    Promise.all([buildDev])
    .then(() => 
    {
        // 停止旋转器
        spinner.stop();
        
        // 输出构建成功
        console.log(chalk.yellow("Build complete.\n"));
    })
    .catch(() => 
    {
        // 停止旋转器
        spinner.stop();

        // 输出构建错误
        console.log(chalk.red("Build failed with errors.\n"));

        // 退出进程
        process.exit(1);
    });
});