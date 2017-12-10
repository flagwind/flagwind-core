namespace flagwind
{
    /**
     * 定义可设置或检索的键/值对。
     * @class
     * @version 1.0.0
     */
    export class KeyValuePair<K, V>
    {
        private _key: K;
        private _value: V;
        
        /**
         * 获取键/值对中的键。
         * @property
         * @returns K
         */
        public get key(): K
        {
            return this._key;
        }
        
        /**
         * 获取键/值对中的值。
         * @property
         * @returns V
         */
        public get value(): V
        {
            return this._value;
        }
        
        /**
         * 初始化 KeyValuePair<K, V> 类的新实例。
         * @param  {K} key 每个键/值对中定义的对象。
         * @param  {V} value 与 key 相关联的定义。
         */
        public constructor(key: K, value: V)
        {
            this._key = key;
            this._value = value;
        }
        
        /**
         * 使用键和值的字符串表示形式返回 KeyValuePair<K, V> 的字符串表示形式。
         * @override
         * @returns string
         */
        public toString(): string
        {
            return `[${this._key || ""}, ${this._value || ""}]`;
        }
    }
}
