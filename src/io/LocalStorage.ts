namespace flagwind
{
    /**
     * 表示全局本地缓存容器。
     * @static
     * @class
     * @version 1.0.0
     */
    export class LocalStorage
    {
        private static _proxy: any;
        
        /**
         * 获取或设置缓存代理。
         * @returns any
         */
        public static get proxy(): any
        {
            if(!this._proxy && window && window.localStorage)
            {
                return window.localStorage;
            }
            
            return this._proxy;
        }

        public static set proxy(value: any)
        {
            this._proxy = value;
        }
        
        /**
         * 获取本地缓存容器的存储数量。
         * @static
         * @property
         * @returns number
         */
        public static get size(): number
        {
            return this.proxy.length;
        }
        
        /**
         * 私有构造方法。
         * @private
         */
        private constructor()
        {
        }
    
        /**
         * 将指定的键值对加入缓存中。
         * @static
         * @param  {string} key 缓存键。
         * @param  {any} obj 缓存值。
         * @returns void
         */
        public static set(key: string, value: any): void
        {
            if(!key)
            {
                throw new ArgumentException();
            }
    
            let serialized: string = this.serialize(value);
            
            this.proxy.setItem(key, serialized);
        }
    
        /**
         * 从缓存中获取指定键名的值。
         * @static
         * @param  {string} key 缓存键。
         * @returns T
         */
        public static get<T> (key: string): T
        {
            return this.deserialize(this.proxy.getItem(key));
        }
    
        /**
         * 从缓存中移除指定键名的值。
         * @static
         * @param  {string} key 缓存键。
         * @returns void
         */
        public static remove(key: string): void
        {
            if(!key)
            {
                throw new ArgumentException(key);
            }
    
            this.proxy.removeItem(key);
        }
    
        /**
         * 清空缓存容器中所有缓存。
         * @static
         * @returns void
         */
        public static clear(): void
        {
            this.proxy.clear();
        }
    
        /**
         * 将指定的字符串序列化为一个字符串。
         * @private
         * @static
         * @param  {any} obj 待序列化的对象。
         * @returns string 序列化的字符串。
         */
        private static serialize(obj: any): string
        {
            return Type.isUndefined(obj) || Type.isFunction(obj) ? obj + "" : JSON.stringify(obj);
        }
        
        /**
         * 将指定的字符串反序列化为一个对象。
         * @private
         * @static
         * @param  {string} str 待反序列化的字符串。
         * @returns any 反序列化后的实例，如果反序列化失败则返回 undefined。
         */
        private static deserialize(str: string): any
        {
            try
            {
                return JSON.parse(str);
            }
            catch(ex)
            {
                return str || undefined;
            }
        }
    }
}
