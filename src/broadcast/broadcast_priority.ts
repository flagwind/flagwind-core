/*!
 * This file is part of `broadcast` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 表示广播接收的优先级别。
 * @enum
 * @version 1.0.0
 */
const enum BroadcastPriority
{
    /**
     * 默认优先级。
     * @member
     */
    normal = 0,
    
    /**
     * 最高的。
     * @member
     */
    highest = 9999,

    /**
     * 最低的。
     * @member
     */
    lowest = -9999
}

export default BroadcastPriority;
