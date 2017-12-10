namespace flagwind
{
    /**
     * 命令在执行器过程中使用的上下文参数。
     * @class
     * @version 1.0.0
     */
    export class CommandContext
    {
        private _executor: ICommandExecutor;
        private _expression: CommandExpression;
        private _command: ICommand;
        private _parameter: any;
        private _extendedProperties: Map<string, any>;
        
        /**
         * 获取命令所在的命令执行器。
         * @property
         * @returns ICommandExecutor
         */
        public get executor(): ICommandExecutor
        {
            return this._executor;
        }

        /**
         * 获取当前命令对应的表达式。
         * @property
         * @returns CommandExpression
         */
        public get expression(): CommandExpression
        {
            return this._expression;
        }

        /**
         * 获取执行的命令对象。
         * @property
         * @returns ICommand
         */
        public get command(): ICommand
        {
            return this._command;
        }
        
        /**
         * 获取命令执行的传入参数。
         * @property
         * @returns any
         */
        public get parameter(): any
        {
            return this._parameter;
        }
        
        /**
         * 获取扩展属性集是否有内容。
         * 在不确定扩展属性集是否含有内容之前，建议先使用该属性来检测。
         * @property
         * @returns boolean
         */
        public get hasExtendedProperties(): boolean
        {
            return this._extendedProperties && this._extendedProperties.size > 0;
        }
        
        /**
         * 获取可用于在本次执行过程中在各处理模块之间组织和共享数据的键/值集合。
         * @property
         * @returns Map
         */
        public get extendedProperties(): Map<string, any>
        {
            if(!this._extendedProperties)
            {
                this._extendedProperties = new Map<string, any>();
            }
            
            return this._extendedProperties;
        }
        
        /**
         * 初始化执行命令上下文的新实例。
         * @constructor
         * @param  {ICommandExecutor} executor 执行命令所在的命令执行器。
         * @param  {CommandExpression} expression 命令对应的表达式。
         * @param  {ICommand} command 执行的命令对象。
         * @param  {any} parameter 命令执行的传入参数。
         * @param  {Map} extendedProperties 在本次执行过程中在各处理模块之间组织和共享数据的键/值集合。
         */
        public constructor(executor: ICommandExecutor, expression: CommandExpression, command: ICommand, parameter: any, extendedProperties: Map<string, any> = null)
        {
            if(!command)
            {
                throw new ArgumentException();
            }
            
            this._executor = executor;
            this._expression = expression;
            this._command = command;
            this._parameter = parameter;
            this._extendedProperties = extendedProperties;
        }
    }
}
