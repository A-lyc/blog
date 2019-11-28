---
title: 酷库-swiper
date: 2019-11-28 16:11:03
category: web
tags:
  - 酷库
---

## swiper
> https://github.com/nolimits4web/swiper
> 非常知名的触摸滑动解决方案


## this.emit 方法
> 该函数用于主动触发 swiper 的事件，文档中找不到....
> 比如在 transitionStart 中写好了切换函数，但是在 初始化(init) 中也想调用一次
> 就可以在 init 中使用 this.emit('transitionStart') 来调用执行

## mousewheel 心得
- 建议开启 mousewheel.releaseOnEdges 否则鼠标滚轮无效
- 写项目时使用 swiper@5.2.1，mousewheel 功能有些 bug，垂直滚动异常，降级即可解决

