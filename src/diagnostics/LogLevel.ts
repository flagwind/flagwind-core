/// <reference path="../runtime/Type" />

namespace flagwind
{
    /**
     * 表示一个日志的级别。
     * @enum
     * @version 1.0.0
     */
    export enum LogLevel
    {
        /**
         * 调试。
         * @member
         */
        debug = 1,

        /**
         * 警告。
         * @member
         */
        warn = 2,

        /**
         * 错误。
         * @member
         */
        error = 3
    }
    
    /*
    * 定义枚举元数据。
    */
    Type.setMetadata(LogLevel,
    // tslint:disable-next-line:align
    {
        debug:
        {
            alias: "DEBUG",
            description: "调试"
        },
        warn:
        {
            alias: "WARN",
            description: "警告"
        },
        error:
        {
            alias: "ERROR",
            description: "错误"
        }
    });
}
