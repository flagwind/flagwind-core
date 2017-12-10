/// <reference path="./ServiceStorageBase" />

namespace flagwind
{
    /**
     * 表示一个用于存取服务项的仓储容器。
     * @class
     * @version 1.0.0
     */
    export class ServiceStorage extends ServiceStorageBase
    {
        private _entries: Set<ServiceEntry>;                        // 保存的服务项列表
        private _namedEntries: Map<string, ServiceEntry>;           // 命名化的服务项
        
        /**
         * 获取当前实际存储的服务项总数。
         * @override
         * @property
         * @returns number
         */
        public get size(): number
        {
            return this._entries.size;
        }
        
        /**
         * 初始化服务仓储的实例。 
         * @param  {IServiceProvider} provider
         */
        public constructor(provider: IServiceProvider)
        {
            super(provider);

            this._entries = new Set<ServiceEntry>();
            this._namedEntries = new Map<string, ServiceEntry>();
        }

        /**
         * 清空当前仓储下的所有服务项。
         * @override
         * @returns void
         */
        public clear(): void
        {
            this._entries.clear();
            this._namedEntries.clear();
        }
        
        /**
         * 移除指定名称的服务项。
         * @override
         * @returns ServiceEntry 移除后的服务项。
         */
        public remove(name: string): ServiceEntry
        {
            if(!name)
            {
                return null;
            }

            let entry: ServiceEntry = null;

            if(this._namedEntries.has(name))
            {
                entry = this._namedEntries.get(name);

                this._entries.delete(entry);
                this._namedEntries.delete(name);
            }

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
         * @param  {Function|string} serviceType 服务类型。
         * @returns ServiceEntry 服务项实例。
         */
        public get(serviceType: Function | string): ServiceEntry;
        public get()
        {
            let args = arguments;

            // 首先从命名项的字典中查找指定名称的服务项
            if(Type.isString(args[0]) && this._namedEntries.has(args[0]))
            {
                return this._namedEntries.get(args[0]);
            }
            
            // 调用父类的查找逻辑
            return super.get(args[0]);
        }

        /**
         * 返回一个循环访问集合的枚举器。
         * @returns IEnumerator
         */
        public getEnumerator(): IEnumerator<ServiceEntry>
        {
            return this._entries.getEnumerator();
        }

        /**
         * 对当前仓储进行迭代处理。
         * @override
         * @param  {Function} callback 每次迭代中执行的回掉函数，当前迭代项及它的索引号将被作为参数传入该方法。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        public forEach(callback: (value: ServiceEntry, source: IEnumerable<ServiceEntry>) => void, scope?: any): void
        {
            this._entries.forEach(callback, scope);
        }

        /**
         * 添加一个服务项至仓储中。
         * @override
         * @param  {ServiceEntry} entry 服务项实例。
         * @returns void
         */
        protected insert(entry: ServiceEntry): void
        {
            if(!entry)
            {
                throw new ArgumentException();
            }
            
            if(entry.name)
            {
                this._namedEntries.set(entry.name, entry);
            }

            this._entries.add(entry);
        }
    }
}
