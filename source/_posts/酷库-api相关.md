---
title: 酷库-api相关
date: 2019-12-20 13:15:50
category: 前端心得
tags:
  - http
---

## axios
> github: https://github.com/axios/axios
> 中文文档: https://www.kancloud.cn/yunye/axios/234845
> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
> 用它就对了

## axios-retry（axios 重试方案）
> github: https://github.com/softonic/axios-retry
> 基于 axios，若 axios 发送的请求失败，可根据配置自动重试

- 可以全局设置，也可以在请求时单独设置
- shouldResetTimeout 的作用为每次重试重置超时，建议开启，否则控制台会变成 “机关枪”
- 默认只有 "5xx错误" 和 "网络错误" 才会重发，可设置 retryCondition 自定义重发逻辑

```javascript
import axios from 'axios'
import axiosRetry from 'axios-retry'

/** 全局设置 **/
axiosRetry(axios, {
  /** options **/
})

axios.get('/abc', {
  /** 单独设置 **/
  'axios-retry': {
    retries: 3
  }
})
```

## promise-poller（重试、轮询）
> https://github.com/joeattardi/promise-poller
> 此库主要作用为基于 Promise 的重试解决方案
> 可用于任何 http 库
> 十分优雅的即可实现
> 也可以 “取巧” 用来当做轮询库使用

```javascript
// return Promise
promisePoller({
  /**
   *  返回 Promise 的任务函数
   *  若 reject 则会重试（可以一直 reject 实现无限轮询）
   *  直到 resolve
   **/
  taskFn,
  
  /** 重试请求间隔 **/
  interval: 500,
  
  /**
   *  失败重试次数
   *  这里设置为 Infinity 则可以实现无限重发（实现无限轮询）
   **/
  retries: 10,
  
  /** 每次请求的超时 **/
  timeout: 1000,
  
  /** 整个任务的超时 **/
  masterTimeout: 5000
});
```