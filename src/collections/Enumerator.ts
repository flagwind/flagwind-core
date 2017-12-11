namespace flagwind
{
    /**
     * 表示一个默认的枚举器。
     * @class
     * @version 1.0.0
     */
    export class Enumerator<T> implements IEnumerator<T>
    {
        private _items: Array<T>;
        private _current: T;
        private _index: number;
        
        /**
         * 获取当前遍历的值。
         * @summary 如果已经遍历结束，则返回 undefined。
         * @property
         * @returns T
         */
        public get current(): T
        {
            return this._current;
        }
        
        /**
         * 初始化 Enumerator<T> 类的新实例。
         * @constructor
         * @param  {Array<T>} items 要枚举的元素。
         */
        public constructor(items: Array<T>)
        {
            if(!items)
            {
                throw new ArgumentException("items");
            }
            
            this._index = 0;
            this._current = undefined;
            this._items = items;
        }
        
        /**
         * 将枚举数推进到集合的下一个元素。
         * @returns boolean 如果枚举数已成功地推进到下一个元素，则为 true；如果枚举数传递到集合的末尾，则为 false。
         */
        public next(): boolean
        {
            let items = this._items;
            
            if(this._index < items.length)
            {
                this._current = items[this._index++];
                
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
