namespace flagwind
{
    /**
     * 表示一个用于存储键值对的数据结构。
     * @class
     * @description Map 类似于对象，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
     * @version 1.0.0
     */
    export class Map<K, V> implements IMap<K, V>
    {
        private _keys: Array<K> = [];               // 键列表
        private _values: Array<V> = [];             // 值列表
        
        /**
         * 获取 Map<K, V> 中实际包含的成员总数。
         * @property
         * @returns number
         */
        public get size(): number
        {
            return this._keys.length;
        }

        /**
         * 设置键名 key 对应的键值为 value，然后返回整个 Map<K, V> 结构。
         * 如果 key 已经有值，则键值会被更新，否则就新生成该键。
         * @param  {K} key 键。
         * @param  {V} value 值。
         * @returns void
         */
        public set(key: K, value: V): Map<K, V>
        {
            let keys = this._keys,
                index = keys.indexOf(key);
            
            if(index === -1)
            {
                index = keys.length;

                keys[index] = key;
            }

            this._values[index] = value;

            return this;
        }
        
        /**
         * 读取 key 对应的键值，如果找不到 key，返回 undefined。
         * @param  {K} key 键。
         * @returns V
         */
        public get(key: K): V
        {
            let index = this._keys.indexOf(key);

            return index !== -1 ? this._values[index] : undefined;
        }
        
        /**
         * 确定 Map<K, V> 是否包含指定的键。
         * @param  {K} key 键。
         * @returns boolean 如果 Map<K, V> 包含具有指定键的成员，则为 true；否则为 false。
         */
        public has(key: K): boolean
        {
            return this._keys.indexOf(key) !== -1;
        }
        
        /**
         * 从 Map<K, V> 中删除指定的键对应的项。
         * @param  {K} key 键。
         * @returns boolean  如果成功找到并移除该项，则为 true；否则为 false。
         */
        public delete(key: K): boolean
        {
            let index = this._keys.indexOf(key);

            if(index !== -1)
            {
                // 删除键和值
                this._keys.splice(index, 1);
                this._values.splice(index, 1);

                return true;
            }

            return false;
        }
        
        /**
         * 清除所有键和值。
         * @returns void
         */
        public clear(): void
        {
            this._keys.length = 0;
            this._values.length = 0;
        }

        /**
         * 返回一个循环访问集合的枚举器。
         * @returns IEnumerator
         */
        public getEnumerator(): IEnumerator<KeyValuePair<K, V>>
        {
            let entries = this.entries();
            
            return new Enumerator<KeyValuePair<K, V>>(entries);
        }
        
        /**
         * 对 IEnumerable<T> 进行迭代处理。
         * @param  {Function} callback 每次迭代中执行的回掉函数，当前迭代项将传入该函数。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        public forEach(callback: (item: KeyValuePair<K, V>, source: IEnumerable<KeyValuePair<K, V>>) => void, scope?: any): void
        {
            let keys = this._keys,
                values = this._values;
            
            for(let i = 0, len = keys.length; i < len; i ++)
            {
                callback.call(scope, new KeyValuePair<K, V>(keys[i], values[i]), this);
            }
        }
        
        /**
         * 获取包含 Map<K, V> 中的键列表。
         * @returns Array
         */
        public keys(): Array<K>
        {
            return this._keys.concat();
        }
        
        /**
         * 获取包含 Map<K, V> 中的值列表。
         * @returns Array
         */
        public values(): Array<V>
        {
            return this._values.concat();
        }
        
        /**
         * 获取包含 Map<K, V> 中的成员列表。
         * @returns Array
         */
        public entries(): Array<KeyValuePair<K, V>>
        {
            let entries = new Array<KeyValuePair<K, V>>();
            
            this.forEach((item, source) =>
            {
                entries.push(new KeyValuePair<K, V>(item.key, item.value));
            });
            
            return entries;
        }
        
        /**
         * 返回 Map<K, V> 的字符串表示形式。
         * @override
         * @returns string
         */
        public toString(): string
        {
            let obj = Object.create(null);
            
            this.forEach((item, source) =>
            {
                obj[item.key] = item.value;
            });
            
            return JSON.stringify(obj);
        }
    }
}
