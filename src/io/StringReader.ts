namespace flagwind
{
    /**
     * 实现从字符串进行读取的读取器。
     * @class
     * @version 1.0.0
     */
    export class StringReader implements IDisposable
    {
        private _text: string;
        private _position: number;
        private _length: number;
        
        /**
         * 初始化从指定字符串进行读取的 StringReader 类的新实例。
         * @constructor
         * @param  {string} text
         */
        public constructor(text: string)
        {
            if(!text)
            {
                throw new ArgumentException();
            }
            
            this._text = text;
            this._position = 0;
            this._length = text.length;
        }
        
        /**
         * 返回下一个可用的字符，但不使用它。
         * @returns number 表示下一个要读取的字符的整数，或者，如果没有更多的可用字符或该流不支持查找，则为 -1。
         */
        public peek(): number
        {
            if(this._position === this._length)
            {
                return -1;
            }
            
            return this._text.charCodeAt(this._position);
        }
        
        /**
         * 读取输入字符串中的下一个字符并将该字符的位置提升一个字符。
         * @returns number 基础字符串中的下一个字符，或者如果没有更多的可用字符，则为 -1。
         */
        public read(): number
        {
            if(this._position === this._length)
            {
                return -1;
            }

            let pos = this._position;

            this._position++;
            
            return this._text.charCodeAt(pos);
        }
        
        /**
         * 将整个流或从流的当前位置到流的结尾作为字符串读取。
         * @returns string 从当前位置到基础字符串的结尾之间的内容。
         */
        public readToEnd(): string
        {
            let str = this._position !== 0 ? this._text.substring(this._position, this._length) : this._text;

            this._position = this._length;

            return str;
        }
        
        /**
         * 从基础字符串中读取一行。
         * @returns string 基础字符串中的下一行；或者如果到达了基础字符串的末尾，则为 null。
         */
        public readLine(): string
        {
            let text = this._text,
                pos;
            
            for(pos = this._position; pos < this._length; ++pos)
            {
                let code = text.charCodeAt(pos);
                let char = String.fromCharCode(code);

                switch(char)
                {
                    case "\r":
                    case "\n":
                    {
                        let str = text.substring(this._position, pos);

                        this._position = pos + 1;
                        
                        // tslint:disable-next-line:no-magic-numbers
                        if(code === 13 && this._position < this._length && text.charCodeAt(this._position) === 10)
                        {
                            this._position++;
                        }

                        return str;
                    }
                    default:
                    {
                        continue;
                    }
                }
            }

            if(pos <= this._position)
            {
                return null;
            }
            
            let str1 = text.substring(this._position, pos);

            this._position = pos;

            return str1;
        }
        
        /**
         * 执行与释放或重置非托管资源关联的应用程序定义的任务。
         * @returns void
         */
        public dispose(): void
        {
            this._text = null;
            this._position = 0;
            this._length = 0;
        }
    }
}
