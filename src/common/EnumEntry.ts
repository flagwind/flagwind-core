namespace flagwind
{
    /**
     * 表示枚举项的描述。
     * @class
     * @version 1.0.0
     */
    export class EnumEntry
    {
        /**
         * 获取枚举项的名称。
         * @member
         */
        public readonly name: string;

        /**
         * 获取枚举项的值。
         * @member
         */
        public readonly value: number;

        /**
         * 获取枚举项的别名。
         * @member
         */
        public readonly alias: string;

        /**
         * 当前描述枚举项的描述文本。
         * @member
         */
        public readonly description: string;
        
        /**
         * 初始化枚举项的新实例。
         * @param  {string} name 枚举项的名称。
         * @param  {number} value 枚举项的值。
         * @param  {string=""} alias 枚举项的别名。
         * @param  {string=""} description 枚举项的描述。
         */
        public constructor(name: string, value: number, alias?: string, description?: string)
        {
            this.name = name;
            this.value = value;
            this.alias = alias || "";
            this.description = description || "";
        }
    }
}
