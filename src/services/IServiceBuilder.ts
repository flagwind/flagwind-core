namespace flagwind
{
    /**
     * 定义用于生成服务实例的机制。
     * @interface
     * @version 1.0.0
     */
    export interface IServiceBuilder
    {
        /**
         * 根据服务项生成服务实例。
         * @param  {ServiceEntry} entry 服务项。
         * @returns any
         */
        build(entry: ServiceEntry): any;
    }
}
