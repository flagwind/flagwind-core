/*!
 * @file This file is part of `services` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { ServiceProviderFactory } from "./service_provider_factory";

/**
 * 将当前类型注入至服务容器中。
 * 注意：如果未指定 providerName 参数则默认注入至默认服务容器中。
 * @param  {string} providerName?
 */
// tslint:disable-next-line:only-arrow-functions
export function service(providerName?: string)
{
    // tslint:disable-next-line:only-arrow-functions
    return function(serviceType: Function)
    {
        let factory = ServiceProviderFactory.instance,
            provider = providerName ? factory.getProvider(providerName) : factory.default;
        
        provider.register(serviceType);
    };
}
