namespace flagwind
{
    /**
     * 表示命令执行器的接口。
     * @interface
     * @version 1.0.0
     */
    export interface ICommandExecutor
    {
        /**
         * 执行命令。
         * @param  {string} commandText 指定要执行的命令表达式文本。
         * @param  {any} parameter? 指定的输入参数。
         * @returns any 返回命令执行的结果。
         */
        execute(commandText: string, parameter?: any): any;
    }
}
