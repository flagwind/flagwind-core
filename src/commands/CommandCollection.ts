namespace flagwind
{
    /**
     * 表示一个命令容器，用户存储命令使用。
     * @class
     * @description 该类为临时过度方案，后续将会替换为命令树的形式进行存储。
     * @version 1.0.0
     */
    export class CommandCollection implements IEnumerable<KeyValuePair<string, ICommand>>
    {
        private _items: Map<string, ICommand>;
        
        /**
         * 获取命令的总数量。
         * @property
         * @returns number
         */
        public get size(): number
        {
            return this._items.size;
        }
        
        /**
         * 初始化命令容器的新实例。
         * @constructor
         */
        public constructor()
        {
            this._items = new Map<string, ICommand>();
        }
        
        /**
         * 将一个命令实例挂载至指定的的路径。
         * @summary 如果指定的路径已存在命令将会抛出异常。
         * @param  {string} path 路径字符串。
         * @param  {ICommand} command 命令。
         * @returns void
         */
        public add(path: string, command: ICommand): void
        {
            if(this._items.has(path))
            {
                throw new ArgumentException(`The command path '${path}' is existed.`);
            }

            this._items.set(path, command);
        }
        
        /**
         * 移除指定路径的命令。
         * @param  {string} path 路径字符串。
         * @returns boolean
         */
        public remove(path: string): boolean
        {
            return this._items.delete(path);
        }
        
        /**
         * 根据指定的路径获取一个命令。
         * @param  {string} path 路径字符串。
         * @returns string
         */
        public find(path: string): ICommand
        {
            let command = this._items.get(path);
            
            return command || null;
        }
        
        /**
         * 检测是否包含指定的路径的命令。
         * @param  {string} path
         * @returns boolean
         */
        public contains(path: string): boolean
        {
            return this._items.has(path);
        }
        
        /**
         * 返回一个循环访问集合的枚举器。
         * @returns IEnumerator
         */
        public getEnumerator(): IEnumerator<KeyValuePair<string, ICommand>>
        {
            return this._items.getEnumerator();
        }
        
        /**
         * 对 IEnumerable<T> 进行迭代处理。
         * @param  {Function} callback 每次迭代中执行的回掉函数，当前迭代项将传入该函数。
         * @param  {any} scope? 回掉函数中 this 所引用的对象。
         * @returns void
         */
        public forEach(callback: (item: KeyValuePair<string, ICommand>, source: IEnumerable<KeyValuePair<string, ICommand>>) => void, scope?: any): void
        {
            this._items.forEach(callback, scope);
        }
    }
}
