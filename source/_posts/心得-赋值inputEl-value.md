---
title: 心得-赋值inputEl.value
date: 2020-01-17 10:56:08
category: 前端心得
tags:
  - 前端心得
---

> 手动赋值 input.value 是项目中常见的场景
> 但是直接赋值的话不会触发 input 事件，导致现实场景中逻辑异常
> 需要手动触发事件

```javascript
let customEvent = document.createEvent('UIEvents')
customEvent.initUIEvent('input', true, true, window, 1)
inputEl.dispatchEvent(customEvent)
```
