---
title: vue-spa-移动端理想的用户体验
category: web
date: 2019-11-08 09:06:15
tags:
  - vue
  - spa
  - 用户体验
---

> 目前前端的跨端技术层出不穷，开发快，对用户透明。
> 对前端开发者来说掌握的东西要更多了~

> 本文谈论一些原生移动 app 用户体验

## 体验分析
> 每天都会用各种 app，各种操作熟记于心
> 总结出以下网页不容易实现的需求

1. 类似网页的历史记录，前进刷新网页，后退时使用历史缓存
2. 前进或者后退（物理返回键）会有不同的切换效果（滑动切换）
3. 点击物理返回键时若正处于 “模态对话框(dialog, alert)等”，不会返回页面，会先将对话框关闭

## 实现难点分析以及解决方案

1. vue keep-alive 无法实现前进刷新，后退使用缓存的 app 缓存逻辑
> 这里可以使用 vue-navigation 实现
2. 前进和后退实现不同的切换效果
> vue transition 标签配合 vue-navigation 实现
3. 模态框逻辑，如何判断当前正在弹框，如何优雅的阻止切换切换并关闭模态框
> 推荐 vue-create-api 这个库，本文例子中使用了 element-ui 中的 MessageBox 实现

## 例子
> [github](https://github.com/q-jason/code/tree/master/good-vue-app)

{% iframe https://codesandbox.io/embed/github/q-jason/code/tree/master/good-vue-app?fontsize=14 100% 800 %}



