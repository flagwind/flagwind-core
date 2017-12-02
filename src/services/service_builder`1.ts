/*!
 * This file is part of `services` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import ServiceEntry from "./service_entry";

/**
 * 定义用于生成服务实例的机制。
 * @interface
 * @version 1.0.0
 */
export default interface IServiceBuilder
{
    /**
     * 根据服务项生成服务实例。
     * @param  {ServiceEntry} entry 服务项。
     * @returns any
     */
    build(entry: ServiceEntry): any;
}
