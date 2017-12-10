/*!
 * This file is part of `commands` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import flagwind from "dist/flagwind";
import PathAnchor = flagwind.PathAnchor;
import CommandExpression = flagwind.CommandExpression;

describe("CommandExpressionTest", () =>
{
    /**
     * 测试 parse 方法。
     */
    it("parseTest", () =>
    {
        let expression = CommandExpression.parse("");
        assert.isNull(expression);

        expression = CommandExpression.parse("/");
        assert.equal("/", expression.name);
        assert.equal("", expression.path);
        assert.equal("/", expression.fullPath);
        assert.equal(PathAnchor.none, expression.anchor);

        expression = CommandExpression.parse(".");
        assert.equal(".", expression.name);
        assert.equal("", expression.path);
        assert.equal(".", expression.fullPath);
        assert.equal(PathAnchor.none, expression.anchor);

        expression = CommandExpression.parse("..");
        assert.equal("..", expression.name);
        assert.equal("", expression.path);
        assert.equal("..", expression.fullPath);
        assert.equal(PathAnchor.none, expression.anchor);
        
        expression = CommandExpression.parse("send");
        assert.equal("send", expression.name);
        assert.equal("", expression.path);
        assert.equal("send", expression.fullPath);
        assert.equal(PathAnchor.none, expression.anchor);
        
        expression = CommandExpression.parse("/send");
        assert.equal("send", expression.name);
        assert.equal("/", expression.path);
        assert.equal("/send", expression.fullPath);
        assert.equal(PathAnchor.root, expression.anchor);

        expression = CommandExpression.parse("./send");
        assert.equal("send", expression.name);
        assert.equal("./", expression.path);
        assert.equal("./send", expression.fullPath);
        assert.equal(PathAnchor.current, expression.anchor);

        expression = CommandExpression.parse("../send");
        assert.equal("send", expression.name);
        assert.equal("../", expression.path);
        assert.equal("../send", expression.fullPath);
        assert.equal(PathAnchor.parent, expression.anchor);

        expression = CommandExpression.parse("sms.send");
        assert.equal("send", expression.name);
        assert.equal("sms/", expression.path);
        assert.equal("sms/send", expression.fullPath);
        assert.equal(PathAnchor.none, expression.anchor);
        
        expression = CommandExpression.parse("/sms.send");
        assert.equal("send", expression.name);
        assert.equal("/sms/", expression.path);
        assert.equal("/sms/send", expression.fullPath);
        assert.equal(PathAnchor.root, expression.anchor);

        expression = CommandExpression.parse("./sms.send");
        assert.equal("send", expression.name);
        assert.equal("./sms/", expression.path);
        assert.equal("./sms/send", expression.fullPath);
        assert.equal(PathAnchor.current, expression.anchor);

        expression = CommandExpression.parse("../sms.send");
        assert.equal("send", expression.name);
        assert.equal("../sms/", expression.path);
        assert.equal("../sms/send", expression.fullPath);
        assert.equal(PathAnchor.parent, expression.anchor);
        
        expression = CommandExpression.parse("push.send -name:wechat -type:message -mode:alias -destination:user.100 -title:'task:create'");
        assert.equal("send", expression.name);
        assert.equal(5, expression.options.size);
        assert.equal("wechat", expression.options.get("name"));
        assert.equal("message", expression.options.get("type"));
        assert.equal("alias", expression.options.get("mode"));
        assert.equal("user.100", expression.options.get("destination"));
        assert.equal("task:create", expression.options.get("title"));
    });
});
