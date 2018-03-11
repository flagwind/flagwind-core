namespace flagwind
{
    /**
     * 表示一个基于控制台输出的日志处理程序。
     * @class
     * @version 1.0.0
     */
    export class ConsoleLogHandler implements ILogHandler
    {
        /**
         * 处理日志项。
         * @param  {LogEntry} entry 日志项。
         * @returns void
         */
        public handle(entry: LogEntry): void
        {
            let print: Function;
            let level = EnumUtils.getEntry(entry.level, LogLevel);

            switch(entry.level)
            {
                case LogLevel.debug:
                {
                    print = console.log;

                    break;
                }
                case LogLevel.warn:
                {
                    print = console.warn;

                    break;
                }
                case LogLevel.error:
                {
                    print = console.error;

                    break;
                }
            }

            print(`[--------[${level.alias}] ${entry.timestamp.toLocaleString()}--------`);
            print(entry.message);

            if(entry.data)
            {
                print(entry.data);
            }

            print(entry.source);
            print("----------------------------------------------]");
        }
    }
}
