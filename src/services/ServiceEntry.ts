namespace flagwind
{
    /**
     * 表示一个用于存取服务使用的服务项。
     * @class
     * @version 1.0.0
     */
    export class ServiceEntry
    {
        private _name: string = null;                                      // 服务名称
        private _service: any = null;                                      // 服务实例
        private _serviceType: Function = null;                             // 服务类型
        private _contractTypes: Array<Function> = null;                         // 服务所持有的契约类型
        private _serviceBuilder: IServiceBuilder = null;                   // 服务生成器
        
        /**
         * 获取服务的名称。
         * @property
         * @returns string
         */
        public get name(): string
        {
            return this._name;
        }
        
        /**
         * 获取服务的类型。
         * @property
         * @returns Function
         */
        public get serviceType(): Function
        {
            if(!this._serviceType)
            {
                let instance = this._service;
                
                if(instance)
                {
                    this._serviceType = Type.getClassType(instance);
                }
            }

            return this._serviceType;
        }
        
        /**
         * 获取服务实例。
         * @property
         * @returns any
         */
        public get service(): any
        {
            if(!this._service)
            {
                // 创建一个新的服务实例
                this._service = this.createService();
            }

            return this._service;
        }
        
        /**
         * 获取一个布尔值，表示当前服务项是否包含服务实例。
         * @property
         * @returns boolean
         */
        public get hasService(): boolean
        {
            return this._service ? true : false;
        }
        
        /**
         * 获取一个布尔值，表示当前服务项是否包含契约类型。
         * @property
         * @returns boolean
         */
        public get hasContracts(): boolean
        {
            return this._contractTypes && this._contractTypes.length > 0;
        }
        
        /**
         * 获取当前服务项包含的所有契约类型。
         * @property
         * @returns Function
         */
        public get contractTypes(): Array<Function>
        {
            return this._contractTypes;
        }

        /**
         * 获取或设置服务生成器。
         * @property
         * @param  {IServiceBuilder} value
         */
        public get serviceBuilder(): IServiceBuilder
        {
            return this._serviceBuilder;
        }
        
        public set serviceBuilder(value: IServiceBuilder)
        {
            this._serviceBuilder = value;
        }

        /**
         * 初始化一个服务项的新实例。
         * @param  {Function} serviceType 服务类型。
         * @param  {Array<Function>} contractTypes? 契约类型。
         */
        public constructor(serviceType: Function, contractTypes?: Array<Function>);
        /**
         * 初始化一个服务项的新实例。
         * @param  {any} service 服务实例。
         * @param  {Array<Function>} contractTypes? 契约类型。
         */
        public constructor(service: any, contractTypes?: Array<Function>);
        /**
         * 初始化一个服务项的新实例。
         * @param  {string} name 服务名称。
         * @param  {Function} serviceType 服务类型。
         * @param  {Array<Function>} contractTypes? 契约类型。
         */
        public constructor(name: string, serviceType: Function, contractTypes?: Array<Function>);
        /**
         * 初始化一个服务项的新实例。
         * @param  {string} name 服务名称。
         * @param  {any} service 服务实例。
         * @param  {Array<Function>} contractTypes? 契约类型。
         */
        public constructor(name: string, service: any, contractTypes?: Array<Function>);
        public constructor()
        {
            let args = arguments;

            switch(args.length)
            {
                // 签名匹配: 
                // constructor(serviceType: Function, contractTypes?: Array<Function>);
                // constructor(service: any, contractTypes?: Array<Function>);
                case 1:
                // tslint:disable-next-line:no-magic-numbers
                case 2:
                {
                    // 参数匹配: serviceType: Function
                    if(Type.isFunction(args[0]))
                    {
                        this._serviceType = args[0];
                    }
                    // 参数匹配: service: any
                    else
                    {
                        this._service = args[0];
                        this._serviceType = Type.getClassType(args[0]);
                    }

                    // 参数匹配: contractTypes?: Array<Function>
                    this._contractTypes = args[1] || null;

                    break;
                }
                // 签名匹配: 
                // constructor(name: string, serviceType: Function, contractTypes?: Array<Function>);
                // constructor(name: string, service: any, contractTypes?: Array<Function>);
                // tslint:disable-next-line:no-magic-numbers
                case 3:
                {
                        // 参数匹配: name: string
                    this._name = args[0];

                    // 参数匹配: serviceType: Function
                    if(Type.isFunction(args[1]))
                    {
                        this._serviceType = args[1];
                    }
                    // 参数匹配: service: any
                    else
                    {
                        this._service = args[1];
                        this._serviceType = Type.getClassType(args[1]);
                    }
                    
                    // 参数匹配: contractTypes?: Array<Function>
                    // tslint:disable-next-line:no-magic-numbers
                    this._contractTypes = args[2] || null;

                    break;
                }
            }
        }
        
        /**
         * 返回服务项的字符串表现形式。
         * @override
         * @returns string
         */
        public toString(): string
        {
            let typeName = Type.getQualifiedClassName(this.serviceType);
            
            if(Type.isEmptyString(this.name))
            {
                return typeName;
            }
            else
            {
                return `${this.name} (${typeName})`;
            }
        }
        
        /**
         * 创建服务实例。
         * @protected
         * @virtual
         * @returns any
         */
        protected createService(): any
        {
            let builder = this._serviceBuilder;

            if(builder)
            {
                // 如果服务生成器，则交由服务生成器生成实例
                let instance = builder.build(this);

                if(instance)
                {
                    this._serviceType = Type.getClassType(instance);
                }

                return instance;
            }

            let type = this._serviceType;
            
            if(type)
            {
                // 否则由默认的实例生成函数生成实例
                return Activator.createInstance(type);
            }

            return null;
        }
    }
}
