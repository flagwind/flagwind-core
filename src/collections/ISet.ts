namespace flagwind
{
    /**
     * 表示一个强类型列表。提供用于对列表进行搜索、排序和操作的方法。
     * @interface
     * @description ISet<T> 接受 null 作为引用类型的有效值，但是不允许有重复的元素。
     * @version 1.0.0
     */
    export interface ISet<T> extends IEnumerable<T>
    {
        /**
         * 获取 ISet<T> 中实际包含的元素总数。
         * @property
         * @returns number
         */
        size: number;

        /**
         * 将元素添加到 ISet<T> 的结尾处。
         * @param  {Array<T>} ...values 要添加到 ISet<T> 末尾处的元素。
         * @returns Set
         */
        add(...values: Array<T>): ISet<T>;
        
        /**
         * 获取指定索引处的元素。
         * @param  {number} index 要获得或设置的元素从零开始的索引。
         * @returns T 指定索引处的元素。
         */
        get(index: number): T;

        /**
         * 设置指定索引处的元素。
         * @param  {number} index 设置的元素从零开始的索引。
         * @param  {T} value 元素值。
         * @returns void
         */
        set(index: number, value: T): void;

        /**
         * 从 ISet<T> 中移除特定元素的匹配项。
         * @param  {T} value 要从 ISet<T> 中移除的元素。
         * @returns boolean 如果成功移除 value，则为 true；否则为 false。如果在 ISet<T> 中没有找到 value，该方法也会返回 false。
         */
        delete(value: T): boolean;

        /**
         * 移除 ISet<T> 的指定索引处的元素。
         * @param  {number} index 要移除的元素的从零开始的索引。
         * @returns void
         */
        deleteAt(index: number): void;

        /**
         * 从 ISet<T> 中移除所有元素。
         * @returns void
         */
        clear(): void;

        /**
         * 搜索指定的元素，并返回整个 ISet<T> 中第一个匹配项的从零开始的索引。
         * @param  {T} value 要在 ISet<T> 中定位的元素。对于引用类型，该值可以为 null。
         * @param  {number} index? 从零开始的搜索的起始索引。
         * @returns number 如果在整个 ISet<T> 中找到 value 的第一个匹配项，则为该项的从零开始的索引；否则为 -1。
         */
        indexOf(value: T, index?: number): number;

        /**
         * 确定某元素是否在 ISet<T> 中。
         * @param  {T} value 要在 ISet<T> 中定位的元素。对于引用类型，该值可以为 null。
         * @returns boolean 如果在 ISet<T> 中找到 value，则为 true，否则为 false。
         */
        has(value: T): boolean;

        /**
         * 返回一个循环访问集合的枚举器。
         * @returns IEnumerator
         */
        getEnumerator(): IEnumerator<T>;

        /**
         * 对 IEnumerable<T> 进行迭代处理。
         * @param  {(item:T,source:IEnumerable<T>)=>void} callback 每次迭代中执行的回掉函数，当前迭代项将传入该函数。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        forEach(callback: (item: T, source: IEnumerable<T>) => void, scope?: any): void;

        /**
         * 对 ISet<T> 进行迭代处理。
         * @param  {(value:T,index:number,set:ISet<T>)=>void} callback 每次迭代中执行的回掉函数，当前迭代项及它的索引号将被作为参数传入该函数。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        forEach(callback: (value: T, index: number, set: ISet<T>) => void, scope?: any): void;

        /**
         * 搜索与指定谓词所定义的条件相匹配的元素，并返回 ISet<T> 中第一个匹配元素。
         * @param  {(value:T,index:number,set:ISet<T>)=>boolean} callback 定义要搜索的元素的条件。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns T
         */
        find(callback: (value: T, index: number, set: ISet<T>) => boolean, scope?: any): T;

        /**
         * 使用指定的比较器对整个 ISet<T> 中的元素进行排序。
         * @param  {(a:T,b:T)=>number} comparer? 比较元素时要使用的比较器函数。
         * @returns void
         */
        sort(comparer?: (a: T, b: T) => number): void;

        /**
         * 将指定的 ISet<T> 合并到当前 ISet<T> 中。
         * @param  {ISet<T>} second 需要合并的数据源。
         * @returns ISet
         */
        union(source: ISet<T>): ISet<T>;

        /**
         * 获取包含 ISet<T> 中的值列表。
         * @returns Array
         */
        values(): Array<T>;
    }
}
