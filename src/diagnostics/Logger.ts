namespace flagwind
{
    /**
     * 提供日志记录的功能。
     * @class
     * @version 1.0.0
     */
    export class Logger
    {
        private static _handlers: ISet<ILogHandler> = new Set<ILogHandler>();
        
        /**
         * 获取所有日志处理程序。
         * @static
         * @returns ISet
         */
        public static get handlers(): ISet<ILogHandler>
        {
            return this._handlers;
        }
        
        /**
         * 记录一个调试日志。
         * @static
         * @param  {any} source 日志来源。
         * @param  {string} message 日志消息。
         * @param  {any} data? 附带数据。
         * @returns void
         */
        public static debug(source: any, message: string, data?: any): void
        {
            this.write(LogLevel.debug, source, message, data);
        }

        /**
         * 记录一个警告日志。
         * @static
         * @param  {any} source 日志来源。
         * @param  {string} message 日志消息。
         * @param  {any} data? 附带数据。
         * @returns void
         */
        public static warn(source: any, message: string, data?: any): void
        {
            this.write(LogLevel.warn, source, message, data);
        }

        /**
         * 记录一个错误日志。
         * @static
         * @param  {any} source 日志来源。
         * @param  {string} message 日志消息。
         * @param  {any} data? 附带数据。
         * @returns void
         */
        public static error(source: any, message: string, data?: any): void
        {
            this.write(LogLevel.error, source, message, data);
        }
        
        /**
         * 写入日志。
         * @static
         * @param  {LogLevel} level 日志级别。
         * @param  {any} source 日志来源。
         * @param  {string} message 日志消息。
         * @param  {any} data? 附带数据。
         * @returns void
         */
        private static write(level: LogLevel, source: any, message: string , data?: any)
        {
            const entry = new LogEntry(level, source, message, data);
            
            this._handlers.forEach((handler: ILogHandler) =>
            {
                handler.handle(entry);
            });
        }
    }
}
