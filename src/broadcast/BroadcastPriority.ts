namespace flagwind
{
    /**
     * 表示广播接收的优先级别。
     * @enum
     * @version 1.0.0
     */
    export const enum BroadcastPriority
    {
        /**
         * 默认优先级。
         * @member
         */
        normal = 0,
        
        /**
         * 最高的。
         * @member
         */
        highest = 9999,

        /**
         * 最低的。
         * @member
         */
        lowest = -9999
    }
}
