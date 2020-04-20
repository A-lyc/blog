---
title: 心得-SPA项目-qs和hash的顺序
category: 前端心得
date: 2020-04-20 19:30:49
tags:
  - vue
  - react
---

> 观察下图 url 和控制台的输出

## 查询字符串在后
> 若为 SPA 项目，qs 应该在 hash 之后
> vue-router、react-router 都是按照这个顺序做的 api

{% asset_img 1.png %}

------------- 手动间隙 -------------

{% asset_img 2.png %}

------------- 手动间隙 -------------

## 查询字符串在前
> 若为常规项目，则 qs 应该在 hash 之前

{% asset_img 3.png %}

------------- 手动间隙 -------------

{% asset_img 4.png %}