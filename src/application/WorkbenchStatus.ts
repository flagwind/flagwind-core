namespace flagwind
{
    /**
     * 表示工作台的运行状态。
     * @enum
     * @version 1.0.0
     */
    export const enum WorkbenchStatus
    {
        /**
         * 未开始或已关闭。
         * @member
         */
        closed = 0,
        
        /**
         * 正在打开中。
         * @member
         */
        opening = 1,

        /**
         * 正常运行。
         * @member
         */
        running = 2,
        
        /**
         * 取消激活中。
         * @member
         */
        deactivating = 3,

        /**
         * 已被取消激活。
         * @member
         */
        deactivated = 4,
        
        /**
         * 正在激活中。
         * @member
         */
        activating = 5,

        /**
         * 正在关闭中。
         * @member
         */
        closing = 6
    }
}
