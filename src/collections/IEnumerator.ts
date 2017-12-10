namespace flagwind
{
    /**
     * 支持对泛型集合的简单迭代。
     * @interface
     * @version 1.0.0
     */
    export interface IEnumerator<T>
    {
        /**
         * 获取当前遍历的值。
         * @summary 如果已经遍历结束，则返回 undefined。
         * @property
         * @returns T
         */
        current: T;
        
        /**
         * 将枚举数推进到集合的下一个元素。
         * @returns boolean 如果枚举数已成功地推进到下一个元素，则为 true；如果枚举数传递到集合的末尾，则为 false。
         */
        next(): boolean;
    }
}
