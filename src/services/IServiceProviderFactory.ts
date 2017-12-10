namespace flagwind
{
    /**
     * 提供关于服务供应程序容器的功能。
     * @interface
     * @version 1.0.0
     */
    export interface IServiceProviderFactory
    {
        /**
         * 获取设置默认的服务供应程序。
         * @property
         */
        default: IServiceProvider;
        
        /**
         * 获取指定名称的服务供应程序。
         * @param  {string} name 指定的服务供应程序名称。
         * @returns IServiceProvider 返回指定名称的服务供应程序。
         */
        getProvider(name: string): IServiceProvider;
    }
}
