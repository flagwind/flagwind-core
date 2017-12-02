/*!
 * This file is part of `io` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 表示关于路径的锚定点。
 * @enum
 * @version 1.0.0
 */
const enum PathAnchor
{
    /**
     * 未锚定。
     * @member
     */
    none,

    /**
     * 基于当前位置。
     * @member
     */
    current,

    /**
     * 基于上级节点。
     * @member
     */
    parent,

    /**
     * 从根节点开始。
     * @member
     */
    root
}

export default PathAnchor;
