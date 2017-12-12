namespace flagwind
{
    /**
     * 表示一个强类型列表。提供用于对列表进行搜索、排序和操作的方法。
     * @class
     * @description Set<T> 接受 null 作为引用类型的有效值，但是不允许有重复的元素。
     * @version 1.0.0
     */
    export class Set<T> implements ISet<T>
    {
        private _values: Array<T> = [];

        /**
         * 获取 Set<T> 中实际包含的元素总数。
         * @property
         * @returns number
         */
        public get size(): number
        {
            return this._values.length;
        }
        
        /**
         * 初始化 Set<T> 的新实例。
         * @param  {Array<T>} ...values
         */
        public constructor(...values: Array<T>)
        {
            this._values.push(...values);
        }
        
        /**
         * 将元素添加到 Set<T> 的结尾处。
         * @param  {T[]} ...values 要添加到 Set<T> 末尾处的元素。
         * @returns Set
         */
        public add(...values: Array<T>): Set<T>
        {
            for(let value of values)
            {
                if(!this.has(value))
                {
                    this._values.push(value);
                }
            }

            return this;
        }
        
        /**
         * 获取指定索引处的元素。
         * @param  {number} index 要获得或设置的元素从零开始的索引。
         * @returns T 指定索引处的元素。
         */
        public get(index: number): T
        {
            return this._values[index];
        }
        
        /**
         * 设置指定索引处的元素。
         * @param  {number} index 设置的元素从零开始的索引。
         * @param  {T} value 元素值。
         * @returns void
         */
        public set(index: number, value: T): void
        {
            let values = this._values;
            
            if(index >= 0 && index < values.length)
            {
                if(!this.has(value))
                {
                    values[index] = value;
                }
            }
        }
        
        /**
         * 从 Set<T> 中移除特定元素的匹配项。
         * @param  {T} value 要从 Set<T> 中移除的元素。
         * @returns boolean 如果成功移除 value，则为 true；否则为 false。如果在 Set<T> 中没有找到 value，该方法也会返回 false。
         */
        public delete(value: T): boolean
        {
            let values = this._values,
                index = values.indexOf(value);

            if(index !== -1)
            {
                values.splice(index, 1);

                return true;
            }

            return false;
        }
        
        /**
         * 移除 Set<T> 的指定索引处的元素。
         * @param  {number} index 要移除的元素的从零开始的索引。
         * @returns void
         */
        public deleteAt(index: number): void
        {
            let values = this._values;

            if(index >= 0 && index < values.length)
            {
                values.splice(index, 1);
            }
        }

        /**
         * 从 Set<T> 中移除所有元素。
         * @returns void
         */
        public clear(): void
        {
            this._values.length = 0;
        }
        
        /**
         * 搜索指定的元素，并返回整个 Set<T> 中第一个匹配项的从零开始的索引。
         * @param  {T} value 要在 Set<T> 中定位的元素。对于引用类型，该值可以为 null。
         * @param  {number} index? 从零开始的搜索的起始索引。
         * @returns number 如果在整个 Set<T> 中找到 value 的第一个匹配项，则为该项的从零开始的索引；否则为 -1。
         */
        public indexOf(value: T, index?: number): number
        {
            return this._values.indexOf(value, index);
        }
        
        /**
         * 确定某元素是否在 Set<T> 中。
         * @param  {T} value 要在 Set<T> 中定位的元素。对于引用类型，该值可以为 null。
         * @returns boolean 如果在 Set<T> 中找到 value，则为 true，否则为 false。
         */
        public has(value: T): boolean
        {
            return this._values.indexOf(value) !== -1;
        }
        
        /**
         * 返回一个循环访问集合的枚举器。
         * @returns IEnumerator
         */
        public getEnumerator(): IEnumerator<T>
        {
            return new Enumerator<T>(this._values);
        }
        
        /**
         * 对 Set<T> 进行迭代处理。
         * @param  {(item:T,index:number,set:Set<T>)=>void} callback 每次迭代中执行的回掉函数，当前迭代项及它的索引号将被作为参数传入该函数。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        public forEach(callback: (item: T, index: number, set: Set<T>) => void, scope?: any): void;
        
        /**
         * 对 IEnumerable<T> 进行迭代处理。
         * @param  {(value:T,source:IEnumerable<T>)=>void} callback 每次迭代中执行的回掉函数，当前迭代项将传入该函数。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        public forEach(callback: (value: T, source: IEnumerable<T>) => void, scope?: any): void;

        public forEach(): void
        {
            let values = this._values,
                callback = arguments[0],
                scope = arguments[1],
                // tslint:disable-next-line:no-magic-numbers
                fromEnumerable = callback.length === 2;         // 标识是否从 IEnumerable 接口调用

            for(let i = 0, len = values.length; i < len; i++)
            {
                fromEnumerable ? callback.call(scope, values[i], this) : callback.call(scope, values[i], i, this);
            }
        }
        
        /**
         * 搜索与指定谓词所定义的条件相匹配的元素，并返回 Set<T> 中第一个匹配元素。
         * @param  {Function} callback 定义要搜索的元素的条件。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns T
         */
        public find(callback: (value: T, index: number, set: Set<T>) => boolean, scope?: any): T
        {
            let values = this._values;

            for(let i = 0, len = values.length; i < len; i++)
            {
                if(callback.call(scope, values[i], i, this))
                {
                    return values[i];
                }
            }
            
            return undefined;
        }
        
        /**
         * 使用指定的比较器对整个 Set<T> 中的元素进行排序。
         * @param  {Function} comparer? 比较元素时要使用的比较器函数。
         * @returns void
         */
        public sort(comparer?: (a: T, b: T) => number): void
        {
            let values = this._values;

            this._values = values.sort(comparer);
        }
        
        /**
         * 将指定的 ISet<T> 合并到当前 ISet<T> 中。
         * @param  {ISet<T>} second 需要合并的数据源。
         * @returns ISet
         */
        public union(source: ISet<T>): ISet<T>
        {
            let values = source.values();

            if(values.length > 0)
            {
                this.add(...values);
            }
            
            return this;
        }
        
        /**
         * 获取包含 Set<T> 中的值列表。
         * @returns Array
         */
        public values(): Array<T>
        {
            return this._values.concat();
        }
        
        /**
         * 返回 Set<T> 的字符串表示形式。
         * @override
         * @returns string
         */
        public toString(): string
        {
            return Array.prototype.toString.call(this._values);
        }
    }
}
