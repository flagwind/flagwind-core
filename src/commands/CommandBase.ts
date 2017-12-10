namespace flagwind
{
    /**
     * 提供实现 ICommand 接口功能的基类。
     * @abstract
     * @class
     * @description 建议需要完成 ICommand 接口功能的实现者从此类继承。
     * @version 1.0.0
     */
    export abstract class CommandBase<TContext extends CommandContext> implements ICommand
    {
        private _name: string;
        private _enabled: boolean;
        
        /**
         * 获取或设置命令的名称。
         * @property
         * @returns string
         */
        public get name(): string
        {
            return this._name;
        }
        
        public set name(value: string)
        {
            if(!value)
            {
                throw new ArgumentException();
            }
            
            if(value.indexOf(".") !== -1 || value.indexOf("/") !== -1)
            {
                throw new ArgumentException();
            }
            
            this._name = value.trim();
        }
        
        /**
         * 获取或设置当前命令是否可用。
         * @summary 该属性作为当前命令是否可被执行的备选方案，命令是否可被执行由 canExecute 方法决定，该方法的不同实现方式可能导致不同的判断逻辑。
         * 有关默认的判断逻辑请参考 canExecute 方法的帮助。
         * @property
         * @returns boolean
         */
        public get enabled(): boolean
        {
            return this._enabled;
        }
        
        public set enabled(value: boolean)
        {
            this._enabled = value;
        }
        
        /**
         * 初始化命令的新实例。
         * @param  {string} name 命令名称。
         * @param  {boolean} enabled 是否启用。
         */
        public constructor(name: string = "", enabled: boolean = true)
        {
            // 如果没有传递名称参数，则约定采用类名(除掉尾部Command)作为命令名称
            this.name = Type.isEmptyString(name) ? StringUtils.trim(Type.getClassName(this), "Command").toLowerCase() : name;
            
            this._enabled = enabled;
        }
        
        /**
         * 判断当前命令能否依据给定的选项和参数执行。
         * @virtual
         * @param  {any} context 判断命令能否执行的上下文对象。
         * @returns boolean 返回能否执行的结果。
         */
        public canExecute(context: TContext): boolean
        {
            return this.enabled;
        }
        
        /**
         * 执行命令。
         * @summary 对实现着的要求：应该在本方法的实现中首先调用 canExecute 方法，以确保阻止非法的调用。
         * @virtual
         * @async
         * @param  {any} context 执行命令的上下文对象。
         * @returns any 返回执行的返回结果。
         */
        public async execute(context: TContext): Promise<any>
        {
            // 在执行之前首先判断是否可以执行
            if(!this.canExecute(context))
            {
                return null;
            }

            // 执行具体的工作
            let result = await this.onExecute(context);

            return result;
        }
        
        /**
         * 当执行命令时调用。
         * @protected
         * @abstract
         * @async
         * @param  {TContext} context 执行命令的上下文对象。
         * @returns any 执行的返回结果。
         */
        protected async abstract onExecute(context: TContext): Promise<any>;
    }
}
