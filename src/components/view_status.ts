/*!
 * This file is part of `components` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 表示视图的状态。
 * @enum
 * @version 1.0.0
 */
export const enum ViewStatus
{
    /**
     * 未进入或已暂停。
     * @member
     */
    none = 0,
    
    /**
     * 进入中。
     * @member
     */
    entering = 1,

    /**
     * 运行中。
     * @member
     */
    running = 2,

    /**
     * 离开中。
     * @member
     */
    leaving = 3
}
