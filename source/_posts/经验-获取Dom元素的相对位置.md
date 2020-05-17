---
title: 经验-获取Dom元素的相对位置
category: 经验
date: 2020-04-02 11:09:08
tags:
  - domEl.getBoundingClientRect
---

## 元素相对于视口的距离
> domEl.getBoundingClientRect 这个方法可以轻松获取
> 例子如下：

```javascript
let react = domObj.getBoundingClientRect();
// react = { top, right, bottom, left, width, height }
//  其中 width, height 有些兼容问题（IE 中没有这俩属性）
```

> 各个属性解释如下
{% asset_img getBoundingClientRect.jpg %}

------------------ END ------------------

## 元素的定位父元素以及距离
> 解释："定位父元素" 是距离自身最近的 position: relative || absolute || fixed 的父级元素
> 获取：用 dom 原生属性即可获取
> 例子：看下图 

{% asset_img offsetParent.png %}

注意：
1. 元素自身有 fixed 定位，offsetParent 的结果为 null
2. 元素自身无 fixed 定位，且父级元素都未经过定位，offsetParent 的结果为 body
4. body 元素的 parentNode 是 null

------------------ END ------------------

## 元素相对于页面最顶部的距离
> 无现成属性
> 可以通过计算而来
> 方法如下：

```javascript
console.log(
  el.getBoundingClientRect().top + window.pageYOffset
)
```

------------------ END ------------------