# 更新日志

## 1.1.0 / 2018-03-13

- 修复安全凭证不能缓存至 LocalStorage 的问题。
- 移除原安全凭票 `Principal` 相关的东西。

## 1.0.9 / 2018-03-12

- 修复安全凭证日期强验证的问题。

## 1.0.8 / 2018-03-11

- 添加 `diagnostics` 诊断命名空间，包含日志记录相关的类。

## 1.0.6 / 2017-12-28

- 修复 `BroadcastManager` 类的一处判断BUG。

## 1.0.5 / 2017-12-27

- 将 `IWorker` 接口的 start、stop、pause、resume 方法改为异步调用。

## 1.0.4 / 2017-12-22

- 开放 LocalStorage 类的代理为可配置。

## 1.0.3 / 2017-12-12

- 添加广播、命令、服务相关的装饰器。

## 1.0.2 / 2017-12-10

- 将构建工具切换为 [`rollup.js`](https://rollupjs.org/zh)
- 为了兼容 [`Egret`](http://developer.egret.com/cn/) 开发方式，改为以命名空间方式组织代码
- 将 [`tslint`](https://palantir.github.io/tslint/) 的本地配置移植为外部库 [`tslint-config-flagwind`](https://www.npmjs.com/package/tslint-config-flagwind)