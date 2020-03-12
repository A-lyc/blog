---
title: 心得-傻傻分不清的 DOM 尺寸属性
category: 前端心得
date: 2019-11-08 09:14:07
tags:
  - 属性记载
---

> 主要讨论以下属性 / 方法
- clientHeight / clientWidth
- offsetHeight / offsetWidth
- scrollHeight / scrollWidth
- getBoundingClientRect 方法

## 包罗万象
> 看懂了就啥都明白了

{% asset_img all.jpg %}

-----------------------------------------------------

## clientHeight / clientWidth
> 包含 padding，不包含 border、margin、滚动条尺寸

{% asset_img clientHeight-clientWidth.png %}

-----------------------------------------------------

## offsetHeight / offsetWidth
> 包含 padding、border、滚动条尺寸，不包含 margin

{% asset_img offsetHeight-offsetWidth.png %}

-----------------------------------------------------

## scrollHeight / scrollWidth
> 此属性一般用于有滚动条的元素
> 返回滚动内容的总尺寸

{% asset_img scrollHeight-scrollWidth.jpg %}

## getBoundingClientRect
> 用于获取某个元素相对于视窗的位置集合
> 返回值对象中有 top, right, bottom, left, width, height 属性。
> 其中 width, height 有些兼容问题（IE 中没有这俩属性）

```javascript
let react = domObj.getBoundingClientRect();
// => { top, right, bottom, left, width, height }
```

{% asset_img getBoundingClientRect.jpg %}