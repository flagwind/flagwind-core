namespace flagwind
{
    /**
     * 表示命令执行器在执行命令时产生的上下文。
     * @class
     * @version 1.0.0
     */
    export class CommandExecutorContext
    {
        private _executor: ICommandExecutor;
        private _expression: CommandExpression;
        private _parameter: any;
        
        /**
         * 获取当前命令执行器对象。
         * @property
         * @returns ICommandExecutor
         */
        public get executor(): ICommandExecutor
        {
            return this._executor;
        }
        
        /**
         * 获取当前命令执行器的命令表达式。
         * @property
         * @returns CommandExpression
         */
        public get expression(): CommandExpression
        {
            return this._expression;
        }
        
        /**
         * 获取从命令执行器传入的参数值。
         * @property
         * @returns any
         */
        public get parameter(): any
        {
            return this._parameter;
        }
        
        /**
         * 初始化命令执行器上下文的新实例。
         * @constructor
         * @param  {ICommandExecutor} executor 当前命令执行器对象。
         * @param  {CommandExpression} expression 当前命令执行器的命令表达式。
         * @param  {any} parameter 从命令执行器传入的参数。
         */
        public constructor(executor: ICommandExecutor, expression: CommandExpression, parameter: any)
        {
            if(!executor || !expression)
            {
                throw new ArgumentException();
            }
            
            this._executor = executor;
            this._expression = expression;
            this._parameter = parameter;
        }
    }
}
