namespace flagwind
{
    /**
     * 表示实现该接口的是一个日志处理程序。
     * @interface
     * @version 1.0.0
     */
    export interface ILogHandler
    {
        /**
         * 处理日志项。
         * @param  {LogEntry} entry 日志项。
         * @returns void
         */
        handle(entry: LogEntry): void;
    }
}
