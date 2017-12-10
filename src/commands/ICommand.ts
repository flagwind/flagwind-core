namespace flagwind
{
    /**
     * 扩展命令接口。
     * @interface
     * @version 1.0.0
     */
    export interface ICommand
    {
        /**
         * 获取命令的名称。
         * @property
         */
        name: string;
        
        /**
         * 获取或设置一个值，该值指示命令是否可以执行。
         * @property
         */
        enabled: boolean;
        
        /**
         * 判断当前命令能否依据给定的选项和参数执行。
         * @param  {any} context 判断命令能否执行的上下文对象。
         * @returns boolean 返回能否执行的结果。
         */
        canExecute(context: any): boolean;
        
        /**
         * 执行命令。
         * 对实现着的要求：应该在本方法的实现中首先调用 canExecute 方法，以确保阻止非法的调用。
         * @async
         * @param  {any} context 执行命令的上下文对象。
         * @returns any 返回执行的返回结果。
         */
        execute(context: any): Promise<any>;
    }
}
