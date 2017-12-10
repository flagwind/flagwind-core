namespace flagwind
{
    /**
     * 表示实现该接口的是一个服务项仓储。
     * @interface
     * @version 1.0.0
     */
    export interface IServiceStorage extends IEnumerable<ServiceEntry>
    {
        /**
         * 添加一个服务项至仓储中。
         * @param  {ServiceEntry} entry 服务项实例。
         * @returns void
         */
        add(entry: ServiceEntry): void;
        
        /**
         * 清空当前仓储下的所有服务项。
         * @returns void
         */
        clear(): void;
        
        /**
         * 移除指定的服务名对应的服务项。
         * @param  {string} name 服务名称。
         * @returns ServiceEntry 服务项实例
         */
        remove(name: string): ServiceEntry;
        
        /**
         * 获取指定名称的服务项实例。
         * @param  {string} name
         * @returns ServiceEntry 服务项实例。
         */
        get(name: string): ServiceEntry;
        /**
         * 获取指定服务类型对应的服务项实例。
         * @param  {Function|string} serviceType 服务类型。
         * @returns ServiceEntry 服务项实例。
         */
        get(serviceType: Function | string): ServiceEntry;
        
        /**
         * 获取指定服务类型的所有服务项实例。
         * @param  {Function} serviceType 服务类型。
         * @returns IEnumerable<ServiceEntry> 服务项列表。
         */
        getAll(serviceType: Function): IEnumerable<ServiceEntry>;
    }
}
