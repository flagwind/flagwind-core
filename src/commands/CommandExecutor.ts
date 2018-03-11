namespace flagwind
{
    /**
     * 提供命令注册与执行的实现。
     * @class
     * @version 1.0.0
     */
    export class CommandExecutor implements ICommandExecutor
    {
        private _commands: CommandCollection;                               // 命令存储容器
        private _parser: ICommandExpressionParser;                          // 命令解析器
        private static _default: CommandExecutor;                           // 默认静态实例
        
        /**
         * 获取或设置默认的命令执行器。
         * @static
         * @property
         * @returns CommandExecutor
         */
        public static get default(): CommandExecutor
        {
            if(!this._default)
            {
                this._default = new CommandExecutor();
            }
            
            return this._default;
        }
        
        /**
         * 获取或设置默认的命令执行器。
         * @static
         * @property
         * @param  {CommandExecutor} value
         */
        public static set default(value: CommandExecutor)
        {
            if(!value)
            {
                throw new ArgumentException("value");
            }
            
            this._default = value;
        }

        /**
         * 初始化命令执行器的新实例。
         * @constructor
         */
        public constructor(parser?: ICommandExpressionParser)
        {
            this._commands = new CommandCollection();
            this._parser = parser || CommandExpressionParser.instance;
        }
        
        /**
         * 注册一个命令。
         * 注意: 如果路径已存在，则会抛出一个异常。
         * @param  {string} path 命令路径。
         * @param  {ICommand} command 命令实例。
         * @returns void
         */
        public register(path: string, command: ICommand): void
        {
            this._commands.add(path, command);
        }
        
        /**
         * 移除指定路径的命令。
         * @param  {string} path
         * @returns boolean
         */
        public remove(path: string): boolean
        {
            return this._commands.remove(path);
        }
        
        /**
         * 查找指定路径的命令。
         * @param  {string} path 路径字符串。
         * @returns ICommand
         */
        public find(path: string): ICommand
        {
            return this._commands.find(path);
        }
        
        /**
         * 执行命令。
         * @summary 暂不支持表达式，commandText 仅为命令路径。
         * @async
         * @param  {string} commandText 指定要执行的命令表达式文本。
         * @param  {any} parameter 指定的输入参数。
         * @returns any 返回命令执行的结果。
         */
        public async execute(commandText: string, parameter: any = null): Promise<any>
        {
            if(!commandText)
            {
                throw new ArgumentException();
            }
            
            let context: CommandExecutorContext = null;

            try
            {
                // 创建命令执行器上下文
                context = this.createExecutorContext(commandText, parameter);

                if(!context)
                {
                    throw new InvalidOperationException("Create executor context failed.");
                }
            }
            catch(ex)
            {
                Logger.error(this, ex);

                return null;
            }

            // 调用执行请求
            let result = this.onExecute(context);

            return result;
        }
        
        /**
         * 当执行命令时调用。
         * @async
         * @param  {CommandExecutorContext} context 命令执行上下文。
         * @returns any
         */
        protected async onExecute(context: CommandExecutorContext): Promise<any>
        {
            let entries = new Array<[CommandExpression, ICommand]>(),
                expression = context.expression;
            
            while(expression !== null)
            {
                // 查找指定路径的命令节点
                let command = this.find(expression.fullPath);

                // 如果指定的路径不存在的则抛出异常
                if(!command)
                {
                    throw new InvalidOperationException(`The command path '${expression.fullPath}' can not found.`);
                }
                
                // 将找到的命令表达式和对应的节点加入数组中
                entries.push([expression, command]);

                // 设置下一个待搜索的命令表达式
                expression = expression.next;
            }

            // 初始化第一个输入参数
            let parameter = context.parameter;

            // 如果列表为空，则返回空
            if(entries.length < 1)
            {
                return null;
            }
            
            for(let i = 0, len = entries.length; i < len; i++)
            {
                let entry = entries[0];

                // 执行命令
                parameter = await this.executeCommand(context, entry[0], entry[1], parameter);
            }

            // 返回最后一个命令的执行结果
            return parameter;
        }
        
        /**
         * 执行命令。
         * @protected
         * @virtual
         * @async
         * @param  {CommandExecutorContext} context
         * @param  {CommandExpression} expression
         * @param  {ICommand} command
         * @param  {any} parameter
         * @returns any
         */
        protected async executeCommand(context: CommandExecutorContext, expression: CommandExpression, command: ICommand, parameter: any): Promise<any>
        {
            if(!context || !expression)
            {
                throw new ArgumentException();
            }

            if(!command)
            {
                return null;
            }

            let result = await command.execute(this.createCommandContext(expression, command, parameter));
            
            return result;
        }
        
        /**
         * 创建命令执行上下文实例。
         * @protected
         * @virtual
         * @param  {string} commandText
         * @param  {any} parameter
         * @returns CommandExecutorContext
         */
        protected createExecutorContext(commandText: string, parameter: any): CommandExecutorContext
        {
            // 解析当前命令文本
            let expression = this.onParse(commandText);
            
            if(!expression)
            {
                throw new InvalidOperationException(`Invalid command expression text: ${commandText}.`);
            }
            
            return new CommandExecutorContext(this, expression, parameter);
        }
        
        /**
         * 创建命令上下文实例。
         * @protected
         * @virtual
         * @param  {CommandExpression} expression
         * @param  {ICommand} command
         * @param  {any} parameter
         * @returns CommandContext
         */
        protected createCommandContext(expression: CommandExpression, command: ICommand, parameter: any): CommandContext
        {
            return new CommandContext(this, expression, command, parameter);
        }
        
        /**
         * 当解析命令表达式时调用。
         * @protected
         * @virtual
         * @param  {string} text
         * @returns CommandExpression
         */
        protected onParse(text: string): CommandExpression
        {
            return this._parser.parse(text);
        }
    }
}
