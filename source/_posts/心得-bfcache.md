---
title: 心得-bfcache
category: 前端心得
date: 2019-11-08 09:36:31
tags:
  - 游览器机制
---

> 本文讨论 bfcache 机制带来的一些 bug

## bfcache 是啥
> 是一个游览器机制
> 比如说从 a 网页去 b 网页，然后再点击 b 网页的回退按钮回到 a 网页
> 页面不会刷新，而是使用缓存，用意是提高用户体验
> 表单提交场景发生的比较多

## 例子：项目分析
> 项目：后端模板 webApp 项目
> 前端：使用了 vue 做部分的效果(日期选择等，现成的组件)，页面上留有额外 input 供后端提取值
> 后端：使用了 php 模板渲染页面
> 结论：使用了较为混乱的开发方式，本以为使用额外 input 与后端进行解耦就可以顺利使用 vue 组件

## 例子：html结构
```html
<main>
  <div id="app">
    <!-- vue 组件 -->
    <vue-comp-input/>
    <vue-comp-input/>
    <vue-comp-input/>
    <vue-comp-input/>
  </div>
  <!-- 供后端提取值的额外 input -->
  <input type="text">
  <input type="text">
  <input type="text">
  <input type="text">
</main>
```

## 例子：bug 展示
{% asset_img demo.gif %}

---------------------------------------------------------

## 总结
> 找了半天原因应该是就是因为使用了混乱的开发方式，导致使正常的 bfcache 逻辑出错
> 最终想到放弃使用 bfcache 逻辑，每次都强制刷新页面即可解决这个问题
> 解决方案如下：

```javascript
// 将此代码放到 head 标签靠上的位置
// 否则会加载额外的资源
// 此代码相当于使用 bfcache 机制的回调
// 使用 location.reload 重置页面
window.addEventListener('pageshow', function (e) {
  if (e.persisted || (window.performance &&
    window.performance.navigation.type == 2)) {
    location.reload();
  }
}, false);
```
