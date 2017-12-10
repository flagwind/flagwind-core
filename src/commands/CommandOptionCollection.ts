namespace flagwind
{
    /**
     * 命令选项集合。
     * @class
     * @version 1.0.0
     */
    export class CommandOptionCollection implements IEnumerable<KeyValuePair<string, string>>
    {
        private _items: Map<string, string>;
        
        /**
         * 获取选项的数量。
         * @property
         * @returns number
         */
        public get size(): number
        {
            return this._items.size;
        }
        
        /**
         * 获取所有选项键。
         * @property
         * @returns Array
         */
        public get keys(): Array<string>
        {
            return this._items.keys();
        }
        
        /**
         * 获取所有选项值。
         * @property
         * @returns Array
         */
        public get values(): Array<string>
        {
            return this._items.values();
        }
        
        /**
         * 初始化命令选项集合的新实例。
         * @param  {IEnumerable<KeyValuePair<string>>} items
         */
        public constructor(items?: IEnumerable<KeyValuePair<string, string>>)
        {
            this._items = new Map<string, string>();
            
            if(items)
            {
                items.forEach((item: KeyValuePair<string, string>) =>
                {
                    this._items.set(item.key, item.value);
                });
            }
        }
        
        /**
         * 根据指定的字符串键获取一个选项值。
         * @param  {string} key
         * @returns string
         */
        public get(key: string): string
        {
            return this._items.get(key);
        }
        
        /**
         * 检测是否包含指定的选项值。
         * @param  {string} key
         * @returns boolean
         */
        public has(key: string): boolean
        {
            return this._items.has(key);
        }
        
        /**
         * 返回一个循环访问集合的枚举器。
         * @returns IEnumerator
         */
        public getEnumerator(): IEnumerator<KeyValuePair<string, string>>
        {
            return this._items.getEnumerator();
        }
        
        /**
         * 对 IEnumerable<T> 进行迭代处理。
         * @param  {Function} callback 每次迭代中执行的回掉函数，当前迭代项将传入该函数。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        public forEach(callback: (item: KeyValuePair<string, string>, source: IEnumerable<KeyValuePair<string, string>>) => void, scope?: any): void
        {
            this._items.forEach(callback, scope);
        }
    }
}
