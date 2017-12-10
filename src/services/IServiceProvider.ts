namespace flagwind
{
    /**
     * 定义用于检索服务对象的机制。
     * @interface
     * @version 1.0.0
     */
    export interface IServiceProvider
    {
        /**
         * 获取服务仓储实例。
         * @property
         */
        storage: IServiceStorage;
        
        /**
         * 注册一个服务至服务容器中。
         * @param  {string} name 服务名称。
         * @param  {Function} serviceType 服务类型。
         * @returns void
         */
        register(name: string, serviceType: Function): void;
        /**
         * 注册一个服务至服务容器中。
         * @param  {string} name 服务名称。
         * @param  {Function} serviceType 服务类型。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns void
         */
        register(name: string, serviceType: Function, contractTypes?: Array<Function>): void;
        /**
         * 注册一个服务至服务容器中。
         * @param  {string} name 服务名称。
         * @param  {any} service 服务实例。
         * @returns void
         */
        register(name: string, service: any): void;
        /**
         * 注册一个服务至服务容器中。
         * @param  {string} name 服务名称。
         * @param  {any} service 服务实例。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns void
         */
        register(name: string, service: any, contractTypes?: Array<Function>): void;
        /**
         * 注册一个服务至服务容器中。
         * @param  {Function} serviceType 服务类型。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns void
         */
        register(serviceType: Function, contractTypes?: Array<Function>): void;
        /**
         * 注册一个服务至服务容器中。
         * @param  {any} service 服务实例。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns void
         */
        register(service: any, contractTypes?: Array<Function>): void;
        
        /**
         * 移除指定名称的服务。
         * @param  {string} name 服务名称。
         * @returns void
         */
        unregister(name: string): void;
        
        /**
         * 根据指定服务名称获取服务实例。
         * @param  {string} name 服务名称。
         * @returns any
         */
        resolve<T>(name: string): T;
        
        /**
         * 根据指定服务类型获取服务实例。
         * @param  {Function|string} serviceType 服务类型。
         * @returns T
         */
        resolve<T>(serviceType: Function | string): T;
        
        /**
         * 根据指定服务类型获取所有服务实例。
         * @param  {Function} serviceType
         * @returns IEnumerable
         */
        resolveAll<T>(serviceType: Function): IEnumerable<T>;
    }
}
