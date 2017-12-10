namespace flagwind
{
    /**
     * 服务仓储基类。
     * @abstract
     * @class
     * @version 1.0.0
     */
    export abstract class ServiceStorageBase implements IServiceStorage
    {
        private _provider: IServiceProvider;                    // 服务提供程序
        
        /**
         * 获取当前实际存储的服务项总数。
         * @property
         * @returns number
         */
        public abstract get size(): number;
        
        /**
         * 获取一个服务提供程序实例。
         * @property
         * @returns IServiceProvider
         */
        public get provider(): IServiceProvider
        {
            return this._provider;
        }
        
        /**
         * 初始化服务仓储的新实例。
         * @param  {IServiceProvider} provider
         */
        public constructor(provider: IServiceProvider)
        {
            if(!provider)
            {
                throw new ArgumentException("provider");
            }
            
            this._provider = provider;
        }
        
        /**
         * 添加一个服务项至仓储中。
         * @param  {ServiceEntry} entry 服务项实例。
         * @returns void
         */
        public add(entry: ServiceEntry): void;
        /**
         * 添加一个服务项至仓储中。
         * @param  {Function} serviceType 服务类型。
         * @returns ServiceEntry
         */
        public add(serviceType: Function): ServiceEntry;
        /**
         * 添加一个服务项至仓储中。
         * @param  {any} service 服务实例。
         * @returns ServiceEntry
         */
        public add(service: any): ServiceEntry;
        /**
         * 添加一个服务项至仓储中。
         * @param  {Function} serviceType 服务类型。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns ServiceEntry
         */
        public add(serviceType: Function, contractTypes?: Array<Function>): ServiceEntry;
        /**
         * 添加一个服务项至仓储中。
         * @param  {any} service 服务实例。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns ServiceEntry
         */
        public add(service: any, contractTypes?: Array<Function>): ServiceEntry;
        /**
         * 添加一个服务项至仓储中。
         * @param  {string} name 服务名称。
         * @param  {Function} serviceType 服务类型。
         * @returns ServiceEntry
         */
        public add(name: string, serviceType: Function): ServiceEntry;
        /**
         * 添加一个服务项至仓储中。
         * @param  {string} name 服务名称。
         * @param  {any} service 服务实例。
         * @returns ServiceEntry
         */
        public add(name: string, service: any): ServiceEntry;
        /**
         * 添加一个服务项至仓储中。
         * @param  {string} name 服务名称。
         * @param  {Function} serviceType 服务类型。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns ServiceEntry
         */
        public add(name: string, serviceType: Function, contractTypes?: Array<Function>): ServiceEntry;
        /**
         * 添加一个服务项至仓储中。
         * @param  {string} name 服务名称。
         * @param  {any} service 服务实例。
         * @param  {Array<Function>} contractTypes? 契约类型。
         * @returns ServiceEntry
         */
        public add(name: string, service: any, contractTypes?: Array<Function>): ServiceEntry;
        public add(): ServiceEntry
        {
            let args = arguments,
                entry: ServiceEntry;
            
            switch(args.length)
            {
                // 重载匹配: 
                // add(entry: ServiceEntry): void;
                // add(serviceType: Function): ServiceEntry;
                // add(service: any): ServiceEntry;
                case 1:
                {
                    if(args[0] instanceof ServiceEntry)
                    {
                        // 参数匹配: entry: ServiceEntry
                        entry = args[0];
                    }
                    else
                    {
                        // 参数匹配: serviceType: Function,
                        // 参数匹配: service: any
                        entry = new ServiceEntry(args[0], null);
                    }

                    break;
                }
                // 重载匹配: 
                // add(serviceType: Function, contractTypes?: Array<Function>): ServiceEntry;
                // add(service: any, contractTypes?: Array<Function>): ServiceEntry;
                // add(name: string, serviceType: Function): ServiceEntry;
                // add(name: string, service: any): ServiceEntry;
                // tslint:disable-next-line:no-magic-numbers
                case 2:
                {
                    if(!Type.isString(args[0]))
                    {
                        // 参数匹配: serviceType: Function, contractTypes?: Array<Function>
                        // 参数匹配: service: any, contractTypes?: Array<Function>
                        entry = new ServiceEntry(args[0], args[1]);
                    }
                    else
                    {
                        // 参数匹配: name: string, serviceType: Function
                        // 参数匹配: name: string, service: any
                        entry = new ServiceEntry(args[0], args[1], null);
                    }

                    break;
                }
                // 重载匹配: 
                // add(name: string, serviceType: Function, contractTypes?: Array<Function>): ServiceEntry;
                // add(name: string, service: any, contractTypes?: Array<Function>): ServiceEntry;
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
                throw new ArgumentException("Can not add service, please check the arguments.");
            }
            
            // 调用抽象方法添加至容器中
            this.insert(entry);

            return entry;
        }
        
        /**
         * 获取指定名称的服务项实例。
         * @param  {string} name
         * @returns ServiceEntry 服务项实例。
         */
        public get(name: string): ServiceEntry;
        /**
         * 获取指定服务类型对应的服务项实例。
         * @param  {Function | string} serviceType 服务类型。
         * @returns ServiceEntry 服务项实例。
         */
        public get(serviceType: Function | string): ServiceEntry;
        public get()
        {
            let args = arguments,
                result: ServiceEntry = null;

            // 重载匹配: get(name: string): ServiceEntry;
            if(Type.isString(args[0]))
            {
                // 从当前容器及其外链容器中查找指定名称的服务
                result = this.findByName(args[0], new Set<IServiceStorage>(this));

                // 如果上面的查找失败，则尝试从默认服务容器及其外链容器中查找指定名称的服务
                let defaultProvider = ServiceProviderFactory.instance.default;
                
                if(!result && defaultProvider && defaultProvider.storage !== this)
                {
                    result = this.findByName(args[0], new Set<IServiceStorage>(defaultProvider.storage));
                }

                // 如果根据名称还没找到，则根据类型进行匹配
                if(!result)
                {
                    // 根据指定类型查找
                    // tslint:disable-next-line:whitespace
                    result = <ServiceEntry>this.findByType(args[0], false);
                }
            }
            // 重载匹配: get(serviceType: Function): ServiceEntry;
            else
            {
                // 根据指定类型查找
                result = <ServiceEntry>this.findByType(args[0], false);
            }

            return result;
        }
        
        /**
         * 获取指定服务类型的所有服务项实例。
         * @param  {Function} serviceType 服务类型。
         * @returns IEnumerable<ServiceEntry> 服务项列表。
         */
        public getAll(serviceType: Function): IEnumerable<ServiceEntry>
        {
            return <IEnumerable<ServiceEntry>>this.findByType(serviceType, true);
        }
            
        /**
         * 清空当前仓储下的所有服务项。
         * @abstract
         * @returns void
         */
        public abstract clear(): void;
        
        /**
         * 移除指定名称的服务项。
         * @abstract
         * @returns ServiceEntry 移除后的服务项。
         */
        public abstract remove(name: string): ServiceEntry;

        /**
         * 返回一个循环访问集合的枚举器。
         * @returns IEnumerator
         */
        public abstract getEnumerator(): IEnumerator<ServiceEntry>;
        
        /**
         * 对 IEnumerable<T> 进行迭代处理。
         * @param  {(item:T,source:IEnumerable<T>)=>void} callback 每次迭代中执行的回掉函数，当前迭代项将传入该函数。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        public abstract forEach(callback: (item: ServiceEntry, source: IEnumerable<ServiceEntry>) => void, scope?: any): void;

        /**
         * 添加一个服务项至仓储中。
         * @abstract
         * @param  {ServiceEntry} entry 服务项实例。
         * @returns void
         */
        protected abstract insert(entry: ServiceEntry): void;
        
        /**
         * 根据名称在指定的服务项列表中查找服务项。
         * @virtual
         * @param  {string} name 服务名称。
         * @param  {ISet<IServiceStorage>} storages 服务仓储列表。
         * @returns ServiceEntry
         */
        protected findByName(name: string, storages: ISet<IServiceStorage>): ServiceEntry
        {
            if(!name || !storages)
            {
                return null;
            }
            
            for(let i = 0; i < storages.size; i++)
            {
                let storage = storages.get(i);

                // 获取当前仓储的迭代器
                let enumerator = storage.getEnumerator();

                while(enumerator.next())
                {
                    let entry: ServiceEntry = enumerator.current;

                    if(!entry)
                    {
                        continue;
                    }

                    // 如果名称匹配成功则返回
                    if(entry.name === name)
                    {
                        return entry;
                    }
                    
                    // 如果当前服务项是一个服务容器
                    if(entry.serviceType && Type.isAssignableFrom(ServiceProvider, entry.serviceType))
                    {
                        let provider = <IServiceProvider>entry.service;

                        // 如果当前服务项对应的服务容器不在外部容器列表中，则将当前服务项(服务容器)加入到外部服务容器列表中
                        if(provider && !storages.has(provider.storage))
                        {
                            storages.add(provider.storage);
                        }
                    }
                }
            }
            
            // 返回空(查找失败)
            return null;
        }
        
        /**
         * 根据指定的类型进行寻找。
         * @virtual
         * @param  {Function | string} type 要查找的服务类型。
         * @param  {boolean} isMultiplex 是否为多个结果。
         * @returns any
         */
        protected findByType(type: Function | string, isMultiplex: boolean): ServiceEntry | ISet<ServiceEntry>
        {
            // 从当前容器及其外链容器中查找指定类型的服务
            let result = this.searchService(type, isMultiplex, new Set<IServiceStorage>(this));
            let succeed = !Type.isEmptyObject(result);
            
            if(succeed)
            {
                // 如果查找结果是一个空 Set，则标识查找失败，继续往下查找
                if(result instanceof Set && result.size === 0)
                {
                    succeed = false;
                }
            }

            // 如果上面的查找失败，则尝试从默认服务容器及其外链容器中查找指定类型的服务
            let defaultProvider = ServiceProviderFactory.instance.default;
            
            if(!succeed && defaultProvider && defaultProvider.storage !== this)
            {
                result = this.searchService(type, isMultiplex, new Set<IServiceStorage>(defaultProvider.storage));
            }
            
            return result;
        }
        
        /**
         * 在指定的仓储中搜索类型。
         * @private
         * @returns any
         */
        private searchService(type: Function | string, isMultiplex: boolean, storages: ISet<IServiceStorage>): ServiceEntry | ISet<ServiceEntry>
        {
            if(!type || !storages)
            {
                return null;
            }

            let weaklys = new Set<ServiceEntry>();
            let strongs = new Set<ServiceEntry>();
            
            for(let i = 0; i < storages.size; i++)
            {
                let storage = storages.get(i);

                // 获取当前仓储的迭代器
                let enumerator = storage.getEnumerator();

                // 迭代查找服务，首先进行类型匹配然后再进行匹配比对
                while(enumerator.next())
                {
                    let entry: ServiceEntry = enumerator.current;

                    if(!entry || !entry.serviceType)
                    {
                        continue;
                    }

                    // 如果服务项声明了契约，则按契约声明进行匹配
                    if(entry.hasContracts)
                    {
                        // 契约的严格匹配
                        if(Type.isFunction(type) && entry.contractTypes.indexOf(<Function>type) !== -1)
                        {
                            if(!isMultiplex)
                            {
                                return entry;
                            }

                            strongs.add(entry);
                        }
                        // 契约的弱匹配
                        else
                        {
                            for(let contract of entry.contractTypes)
                            {
                                if(Type.isAssignableFrom(type, contract))
                                {
                                    weaklys.add(entry);
                                }
                            }
                        }
                    }
                    // 处理未声明契约的服务
                    else
                    {
                        // 服务类型的严格匹配
                        if(Type.isFunction(type) && entry.serviceType === type)
                        {
                            if(!isMultiplex)
                            {
                                return entry;
                            }

                            strongs.add(entry);
                        }
                        // 服务类型的弱匹配
                        else
                        {
                            if(Type.isAssignableFrom(type, entry.serviceType))
                            {
                                weaklys.add(entry);
                            }
                        }
                    }

                    // 如果只查找单个服务
                    if(!isMultiplex)
                    {
                        // 如果只查找单个服务，并且弱匹配已成功则退出查找
                        if(weaklys.size > 0)
                        {
                            break;
                        }

                        // 如果当前服务项是一个服务容器
                        if(entry.serviceType && Type.isAssignableFrom(ServiceProvider, entry.serviceType))
                        {
                            let provider = <IServiceProvider>entry.service;

                            // 如果当前服务项对应的服务容器不在外部容器列表中，则将当前服务项(服务容器)加入到外部服务容器列表中
                            if(provider && !storages.has(provider.storage))
                            {
                                storages.add(provider.storage);
                            }
                        }
                    }
                }

                if(isMultiplex)
                {
                    return strongs.union(weaklys);
                }
                else if(weaklys.size > 0)
                {
                    return weaklys.get(0);
                }
            }

            // 返回空(查找失败)
            return null;
        }
    }
}
