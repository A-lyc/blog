---
title: 心得-IE游览器请求缓存问题
category: 经验
date: 2020-06-04 10:15:08
tags:
  - IE
  - 缓存
---

> IE游览器的缓存机制：
> 所有的 GET 请求都会被缓存（包括 ajax）
> 之后再次请求相同的 url 时
> 会使用缓存数据，导致新数据无法获取
> 如下图：

{% asset_img example.jpg %}

-------------------- 手动间隔 --------------------

## 解决办法

### 给 GET 请求 URL 后面加个时间戳参数
```text
http://www.xxx.com/api/getData
http://www.xxx.com/api/getData?at=1591237338151
```

### GET 请求头中声明禁用缓存
> Cache-Control: no-cache
> Pragma: no-cache
```javascript
// 例子使用了 axios
request.defaults.headers.get[ 'Cache-Control' ] = 'no-cache'
request.defaults.headers.get[ 'Pragma' ] = 'no-cache'
```