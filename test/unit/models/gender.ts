/*!
 * This file is part of `test` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import fw from "dist/flagwind";

/**
 * 表示一个性别枚举。
 * @enum
 */
enum Gender
{
    /**
     * 先生。
     * @member
     */
    male,

    /**
     * 女士。
     * @member
     */
    female
}

/**
 * 定义枚举元数据。
 * @define
 */
fw.Type.setMetadata(Gender,
// tslint:disable-next-line:align
{
    male:
    {
        alias: "M",
        description: "男士"
    },
    female:
    {
        alias: "F",
        description: "女士"
    }
});

export default Gender;
