namespace flagwind
{
    /**
     * EventArgs 类作为创建事件参数的基类，当发生事件时，EventArgs 实例将作为参数传递给事件侦听器。
     * @class
     * @version 1.0.0
     */
    export class EventArgs
    {
        private _type: string;                      // 事件类型
        private _source: any;                       // 事件源
        private _data: any;                         // 事件关联的数据
        
        /**
         * 获取一个字符串值，表示事件的类型。
         * @property
         * @returns string
         */
        public get type(): string
        {
            return this._type;
        }

        /**
         * 获取或设置事件源对象。
         * @property
         * @returns any
         */
        public get source(): any
        {
            return this._source;
        }

        public set source(value: any)
        {
            if(!value)
            {
                throw new ArgumentException();
            }

            this._source = value;
        }
        
        /**
         * 获取或设置与事件关联的可选数据。
         * @property
         * @returns any
         */
        public get data(): any
        {
            return this._data;
        }
        
        public set data(value: any)
        {
            this._data = value;
        }
        
        /**
         * 初始化 EventArgs 类的新实例。
         * @constructor
         * @param  {string} type 事件类型。
         * @param  {any?} data 可选数据。
         */
        public constructor(type: string, data?: any)
        {
            if(!type)
            {
                throw new ArgumentException();
            }

            this._type = type;
            this._data = data;
        }
    }
}
