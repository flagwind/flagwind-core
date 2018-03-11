namespace flagwind
{
    /**
     * 表示一个日志项。
     * @interface
     * @version 1.0.0
     */
    export class LogEntry
    {
        private _level: LogLevel;
        private _source: any;
        private _message: string;
        private _data: any;
        private _timestamp: Date;

        /**
         * 获取日志级别。
         * @member
         * @returns LogLevel
         */
        public get level(): LogLevel
        {
            return this._level;
        }

        /**
         * 获取日志来源。
         * @member
         * @returns any
         */
        public get source(): any
        {
            return this._source;
        }

        /**
         * 获取或设置消息。
         * @member
         * @returns string
         */
        public get message(): string
        {
            return this._message;
        }

        /**
         * 获取或设置数据。
         * @member
         * @returns any
         */
        public get data(): any
        {
            return this._data;
        }
        
        /**
         * 获取或设置时间。
         * @member
         * @returns Date
         */
        public get timestamp(): Date
        {
            return this._timestamp;
        }
        
        /**
         * 初始化日志项的新实例。
         * @param  {LogLevel} level 日志级别。
         * @param  {any} source 日志来源。
         * @param  {string} message 消息。
         * @param  {any} data? 附带数据。
         */
        public constructor(level: LogLevel, source: any, message: string , data?: any)
        {
            this._level = level;
            this._source = source;
            this._message = message;
            this._data = data;
            this._timestamp = new Date();
        }
    }
}
