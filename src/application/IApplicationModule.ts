namespace flagwind
{
    /**
     * 向实现类提供应用扩展模块初始化和处置事件。
     * @interface
     * @version 1.0.0
     */
    export interface IApplicationModule extends IDisposable
    {
        /**
         * 获取应用扩展模块名称。
         * @property
         */
        name: string;
        
        /**
         * 初始化应用扩展模块，并使其为处理请求做好准备。
         * 使用该方法将事件处理方法向具体事件进行注册等初始化操作。
         * @param  {ApplicationContextBase} context 一个上下文对象，它提供对模块处理应用程序内所有应用程序对象的公用的方法、属性和事件的访问。
         * @returns void
         */
        initialize(context: ApplicationContextBase): void;
    }
}
