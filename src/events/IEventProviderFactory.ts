namespace flagwind
{
    /**
     * 提供关于事件提供程序的功能。
     * @interface
     * @version 1.0.0
     */
    export interface IEventProviderFactory
    {
        /**
         * 获取指定事件源的事件提供程序。
         * @param  {any} source IEventProvider 所抛出事件对象的源对象。
         * @returns IEventProdiver 返回指定名称的事件提供程序。
         */
        getProvider(source: any): IEventProvider;
    }
}
