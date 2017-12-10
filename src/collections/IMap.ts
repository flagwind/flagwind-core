namespace flagwind
{
    /**
     * 表示一个用于存储键值对的数据结构。
     * @interface
     * @description IMap 类似于对象，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
     * @version 1.0.0
     */
    export interface IMap<K, V> extends IEnumerable<KeyValuePair<K, V>>
    {
        /**
         * 获取 IMap<K, V> 中实际包含的成员总数。
         * @property
         * @returns number
         */
        size: number;

        /**
         * 设置键名 key 对应的键值为 value，然后返回整个 IMap<K, V> 结构。
         * 如果 key 已经有值，则键值会被更新，否则就新生成该键。
         * @param  {K} key 键。
         * @param  {V} value 值。
         * @returns void
         */
        set(key: K, value: V): IMap<K, V>;

        /**
         * 读取 key 对应的键值，如果找不到 key，返回 undefined。
         * @param  {K} key 键。
         * @returns V
         */
        get(key: K): V;

        /**
         * 确定 IMap<K, V> 是否包含指定的键。
         * @param  {K} key 键。
         * @returns boolean 如果 Map<K, V> 包含具有指定键的成员，则为 true；否则为 false。
         */
        has(key: K): boolean;

        /**
         * 从 IMap<K, V> 中删除指定的键对应的项。
         * @param  {K} key 键。
         * @returns boolean  如果成功找到并移除该项，则为 true；否则为 false。
         */
        delete(key: K): boolean;

        /**
         * 清除所有键和值。
         * @returns void
         */
        clear(): void;

        /**
         * 获取包含 IMap<K, V> 中的键列表。
         * @returns Array
         */
        keys(): Array<K>;

        /**
         * 获取包含 IMap<K, V> 中的值列表。
         * @returns Array
         */
        values(): Array<V>;

        /**
         * 获取包含 IMap<K, V> 中的成员列表。
         * @returns Array
         */
        entries(): Array<KeyValuePair<K, V>>;

        /**
         * 返回一个循环访问集合的枚举器。
         * @returns IEnumerator
         */
        getEnumerator(): IEnumerator<KeyValuePair<K, V>>;
        
        /**
         * 对 IEnumerable<T> 进行迭代处理。
         * @param  {Function} callback 每次迭代中执行的回掉函数，当前迭代项将传入该函数。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        forEach(callback: (item: KeyValuePair<K, V>, source: IEnumerable<KeyValuePair<K, V>>) => void, scope?: any): void;
    }
}
