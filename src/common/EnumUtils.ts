namespace flagwind
{
    /**
     * 关于的枚举辅助工具类。
     * @static
     * @class
     * @version 1.0.0
     */
    export class EnumUtils
    {
        private static readonly _entryCache = new Map<any, Array<EnumEntry>>();
        
        /**
         * 获取指定枚举项对应的描述对象。
         * @param  {number} value 枚举值。
         * @param  {any} type 要获取的枚举类型。
         * @returns EnumEntry 返回的指定枚举项对应的枚举描述对象。
         */
        public static getEntry(value: number, type: any): EnumEntry
        {
            if(!type)
            {
                throw new ArgumentException();
            }
            
            let entries = this.getEntries(type).filter(e => e.value === value);

            return entries.length === 1 ? entries[0] : null;
        }
        
        /**
         * 获取指定枚举的描述对象数据。
         * @param  {any} type 要获取的枚举类型。
         * @returns Array<EnumEntry> 返回的枚举描述对象数组。
         */
        public static getEntries(type: any): Array<EnumEntry>
        {
            if(!type)
            {
                throw new ArgumentException();
            }
            
            // 尝试从缓存中获取
            if(this._entryCache.has(type))
            {
                return this._entryCache.get(type);
            }
            
            // 获取枚举的元数据
            let metadata = Type.getMetadata(type) || {};

            let entries = new Array<EnumEntry>(),
                fields = this.getFields(type);

            for(let [name, value] of fields)
            {
                let meta = metadata[name];
                let alias = meta ? meta.alias : "";
                let description = meta ? meta.description : "";

                entries.push(new EnumEntry(name, value, alias, description));
            }
            
            // 加入缓存以便下次获取
            if(entries.length > 0)
            {
                this._entryCache.set(type, entries);
            }

            return entries;
        }

        /**
         * 获取指定枚举类型的字段列表
         * @param  {any} type 枚举类型。
         * @returns Array<[string, number]> 一个元组数据，数据项以<名称,值>的方式返回。
         */
        public static getFields(type: any): Array<[string, number]>
        {
            if(!type)
            {
                throw new ArgumentException();
            }

            let fields = Object.keys(type)
                            .map(key => [key, type[key]])
                            .filter(([key, value]) => Type.isNumber(value));

            return fields as Array<[string, number]>;
        }
    }
}
