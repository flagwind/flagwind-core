namespace flagwind
{
    /**
     * 提供关于服务供应程序容器的功能。
     * @class
     * @version 1.0.0
     */
    export class ServiceProviderFactory implements IServiceProviderFactory, IEnumerable<KeyValuePair<string, IServiceProvider>>
    {
        private _defaultName: string;                                   // 默认提供程序容器名称
        private _providers: Map<string, IServiceProvider>;              // 私有提供程序字典
        private static _instance: ServiceProviderFactory;               // 静态单实例
        
        /**
         * 获取一个服务提供程序工厂的单实例。
         * @static
         * @property
         * @returns ServiceProviderFactory
         */
        public static get instance(): ServiceProviderFactory
        {
            if(!this._instance)
            {
                this._instance = new ServiceProviderFactory();
            }

            return this._instance;
        }

        /**
         * 获取或设置默认的服务提供程序。
         * @property
         */
        public get default(): IServiceProvider
        {
            let provicer = this.getProvider(this._defaultName);

            if(!provicer)
            {
                provicer = new ServiceProvider();
                
                this.register(this._defaultName, provicer);
            }
            
            return provicer;
        }
        
        public set default(value: IServiceProvider)
        {
            if(!value)
            {
                throw new ArgumentException();
            }

            this.register(this._defaultName, value);
        }
        
        /**
         * 初始化服务提供程序工厂的新实例。
         * @param  {string} defaultName? 默认提供程序名称。
         */
        protected constructor(defaultName: string = "")
        {
            this._defaultName = defaultName;
            this._providers = new Map<string, IServiceProvider>();
        }
        
        /**
         * 注册服务提供程序。
         * @param  {string} name 要注册的服务供应程序的名称。
         * @param  {IServiceProvider} provider 服务提供程序实例。
         * @returns void
         */
        public register(name: string, provider: IServiceProvider): void
        {
            if(Type.isEmptyObject(name))
            {
                throw new ArgumentException("name");
            }

            this._providers.set(name.trim(), provider);
        }
        
        /**
         * 注销服务提供程序。
         * @param  {string} name 要注销的服务提供程序名称。
         */
        public unregister(name: string)
        {
            if(Type.isEmptyObject(name))
            {
                throw new ArgumentException();
            }

            this._providers.delete(name.trim());
        }
        
        /**
         * 获取指定名称的服务供应程序。
         * @param  {string} name 指定的服务供应程序名称。
         * @returns IServiceProvider 返回指定名称的服务供应程序。
         */
        public getProvider(name: string): IServiceProvider
        {
            if(Type.isEmptyObject(name))
            {
                throw new ArgumentException("name");
            }
            
            name = name.trim();

            if(this._providers.has(name))
            {
                return this._providers.get(name);
            }

            return null;
        }
        
        /**
         * 返回一个循环访问集合的枚举器。
         * @returns IEnumerator<KeyValuePair<string, IServiceProvider>>
         */
        public getEnumerator(): IEnumerator<KeyValuePair<string, IServiceProvider>>
        {
            return this._providers.getEnumerator();
        }
        
        /**
         * 对 IEnumerable<T> 进行迭代处理。
         * @param  {Function} callback 每次迭代中执行的回掉函数，当前迭代项将被作为参数传入该函数。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        public forEach(callback: (item: KeyValuePair<string, IServiceProvider>, source: IEnumerable<KeyValuePair<string, IServiceProvider>>) => void, scope?: any): void
        {
            this._providers.forEach(callback, scope);
        }
    }
}
