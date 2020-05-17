---
title: 经验-url 中 query 和 hash 的顺序（SPA）
category: 经验
date: 2020-04-20 19:30:49
tags:
  - vue
  - react
---

> 观察下图 url 和控制台的输出

## 查询字符串在后
> 若为 SPA 项目，qs 应该在 hash 之后
> vue-router、react-router 都是按照这个顺序做的 api
> 但是 location.search 为空

{% asset_img 1.png %}

------------- 手动间隙 -------------

{% asset_img 2.png %}

------------- 手动间隙 -------------

## 查询字符串在前
> 若为常规项目，则 qs 应该在 hash 之前
> 但是 vue-router 和 react-router 设计的 api 取不到值

{% asset_img 3.png %}

------------- 手动间隙 -------------

{% asset_img 4.png %}