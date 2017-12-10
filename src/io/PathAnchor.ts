namespace flagwind
{
    /**
     * 表示关于路径的锚定点。
     * @enum
     * @version 1.0.0
     */
    export const enum PathAnchor
    {
        /**
         * 未锚定。
         * @member
         */
        none,

        /**
         * 基于当前位置。
         * @member
         */
        current,

        /**
         * 基于上级节点。
         * @member
         */
        parent,

        /**
         * 从根节点开始。
         * @member
         */
        root
    }
}
