namespace flagwind
{
    /**
     * 提供命令行文本解析功能。
     * @interface
     * @version 1.0.0
     */
    export interface ICommandExpressionParser
    {
        /**
         * 将指定的命令行文本解析成命令表达式对象。
         * @param  {string} text 指定的要解析的命令行文本。
         * @returns CommandExpression 返回解析的命令表达式对象，如果解析失败则返回空(null)。
         */
        parse(text: string): CommandExpression;
    }
}
