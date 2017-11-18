/*!
 * @file This file is part of `services` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import { Type } from "../../../../src/runtime/type";
import { ServiceProvider, ServiceProviderFactory, IWorker, WorkerBase } from "../../../../src/services";
import { Employee, Person, Gender } from "../../models";
import { BroadcastWorker } from "./workers/broadcast_worker";
import { HeartbeatWorker } from "./workers/heartbeat_worker";

describe("ServiceProviderTest", () =>
{
    const provider1 = new ServiceProvider();
    const provider2 = new ServiceProvider();
    const provider3 = new ServiceProvider();
    const defaultProvider = ServiceProviderFactory.instance.default;

    defaultProvider.register("string", "I'm a service.");

    provider1.register("WK1", new BroadcastWorker());
    provider1.register(Person);

    provider2.register("WK2", new HeartbeatWorker());
    provider2.register(Employee);

    /**
     * 服务解析测试。
     */
    it("resolveTest", () =>
    {
        let worker: IWorker;

        // 测试以类型的方式获取服务
        worker = provider1.resolve<IWorker>(WorkerBase);
        assert.isNotNull(worker);
        assert.equal("broadcast", worker.name);

        // 测试以名称的方式获取服务
        worker = provider1.resolve<IWorker>("WK1");
        assert.isNotNull(worker);
        assert.equal("broadcast", worker.name);

        // 测试不能跨容器获取服务
        worker = provider1.resolve<IWorker>("WK2");
        assert.isNull(worker);

        // 测试当前容器获取不到，则从默认容器中获取
        assert.isNotNull(provider1.resolve("string"));
        assert.isNotNull(provider2.resolve("string"));

        // 将二号服务容器加入到一号服务容器中
        provider1.register(provider2);
        
        // 测试从子容器中查找
        worker = provider1.resolve<IWorker>("WK2");
        assert.isNotNull(worker);
        assert.equal("heartbeat", worker.name);
    });
});