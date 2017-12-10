namespace flagwind
{
    /**
     * 用于检索服务对象的提供程序。
     * @class
     * @version 1.0.0
     */
    export class ServiceProvider implements IServiceProvider
    {
        protected _storage: IServiceStorage;                      // 服务仓储
        protected _builder: IServiceBuilder;                      // 服务生成器
        
        /**
         * 获取服务仓储实例。
         * @property
         * @returns IServiceStorage
         */
        public get storage(): IServiceStorage
        {
            return this._storage;
        }
        
        /**
         * 获取服务生成器实例。
         * @property
         * @returns IServiceBuilder
         */
        public get builder(): IServiceBuilder
        {
            return this._builder;
        }

        /**
         * 初始化服务提供程序的新实例。
         * @param  {IServiceStorage} storage? 服务仓储实例。
         * @param  {IServiceBuilder} builder? 服务生成器实例。
         */
        public constructor(storage?: IServiceStorage, builder?: IServiceBuilder)
        {
            // 如果服务仓储为空，则使用默认的仓储
            storage = storage || new ServiceStorage(this);
            
            this._storage = storage;
            this._builder = builder;
        }

        /**
         * 注册一个服务至服务容器中。
         * @param  {string} name 服务名称。
         * @param  {Function} serviceType 服务类型。
         * @returns void
         */
        public register(name: string, serviceType: Function): void;
        /**
         * 注册一个服务至服务容器中。
         * @param  {string} name 服务名称。
         * @param  {Function} serviceType 服务类型。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns void
         */
        public register(name: string, serviceType: Function, contractTypes?: Array<Function>): void;
        /**
         * 注册一个服务至服务容器中。
         * @param  {string} name 服务名称。
         * @param  {any} service 服务实例。
         * @returns void
         */
        public register(name: string, service: any): void;
        /**
         * 注册一个服务至服务容器中。
         * @param  {string} name 服务名称。
         * @param  {any} service 服务实例。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns void
         */
        public register(name: string, service: any, contractTypes?: Array<Function>): void;
        /**
         * 注册一个服务至服务容器中。
         * @param  {Function} serviceType 服务类型。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns void
         */
        public register(serviceType: Function, contractTypes?: Array<Function>): void;
        /**
         * 注册一个服务至服务容器中。
         * @param  {any} service 服务实例。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns void
         */
        public register(service: any, contractTypes?: Array<Function>): void;
        public register()
        {
            let args = arguments,
                entry: ServiceEntry;
            
            switch(args.length)
            {
                // 签名匹配: 
                // register(name: string, serviceType: Function): void;
                // register(name: string, service: any): void;
                // register(serviceType: Function, contractTypes?: Array<Function>): void;
                // register(service: any, contractTypes?: Array<Function>): void;
                case 1:
                // tslint:disable-next-line:no-magic-numbers
                case 2:
                {
                    if(Type.isString(args[0]))
                    {
                        // 参数匹配: name: string, serviceType: Function
                        // 参数匹配: name: string, service: any
                        entry = new ServiceEntry(args[0], args[1], null);
                    }
                    else
                    {
                        // 参数匹配: serviceType: Function, contractTypes?: Array<Function>
                        // 参数匹配: service: any, contractTypes?: Array<Function>
                        entry = new ServiceEntry(args[0], args[1]);
                    }

                    break;
                }
                // 签名匹配: 
                // register(name: string, serviceType: Function, contractTypes?: Array<Function>): void;
                // register(name: string, service: any, contractTypes?: Array<Function>): void;
                // tslint:disable-next-line:no-magic-numbers
                case 3:
                {
                    // 参数匹配: name: string, serviceType: Function, contractTypes?: Array<Function>
                    // 参数匹配: name: string, service: any, contractTypes?: Array<Function>
                    // tslint:disable-next-line:no-magic-numbers
                    entry = new ServiceEntry(args[0], args[1], args[2]);

                    break;
                }
            }
                
            if(!entry)
            {
                throw new ArgumentException("Can not register service, please check the arguments.");
            }
            
            // 将服务项添加至服务仓储中
            this._storage.add(entry);
        }

        /**
         * 移除指定名称的服务。
         * @param  {string} name 服务名称。
         * @returns void
         */
        public unregister(name: string): void
        {
            this._storage.remove(name);
        }
        
        /**
         * 根据指定服务名称获取服务实例。
         * @param  {string} name 服务名称。
         * @returns any
         */
        public resolve<T>(name: string): T;
        /**
         * 根据指定服务类型获取服务实例。
         * @param  {Function|string} serviceType 服务类型。
         * @returns T
         */
        public resolve<T>(serviceType: Function | string): T;
        public resolve()
        {
            // 通过服务仓储获取服务项
            let entry = this._storage.get(arguments[0]);
            
            if(!Type.isEmptyObject(entry))
            {
                // 根据服务项解析服务
                return this.getService(entry);
            }

            return null;
        }
        
        /**
         * 根据指定服务类型获取所有服务实例。
         * @param  {Function} serviceType
         * @returns IEnumerable
         */
        public resolveAll<T>(serviceType: Function): IEnumerable<T>
        {
            let result = new Set<T>(),
                entries = this._storage.getAll(serviceType);
            
            entries.forEach((entry: ServiceEntry) =>
            {
                result.add(this.getService(entry));
            });

            return result;
        }
        
        /**
         * 根据服务项获取服务实例。
         * @protected
         * @virtual
         * @param  {ServiceEntry} entry
         * @returns any 如果获取到服务则返回服务实例，否则为 null。
         */
        protected getService(entry: ServiceEntry): any
        {
            if(!entry)
            {
                return null;
            }
            
            let result = entry.service;
            
            // 如果服务项未包含服务实例，则尝试用生成器生成实例
            if(Type.isEmptyObject(result))
            {
                let builder = this._builder;

                if(builder)
                {
                    result = builder.build(entry);
                }
            }

            return result || Activator.createInstance(entry.serviceType);
        }
    }
}
