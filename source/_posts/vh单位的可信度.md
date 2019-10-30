---
title: vh单位的可信度
category: web
tags: css
---

> vw, vh 都是自适应页面的利器
> vw 表现良好，vh 在 pc 端网页表现良好，但是在手机下 不！可！信！

## 问题
> 手机游览器的 100vh 总会高出一截
> 经过查阅，好像是算上了地址栏的高度，并且不准备修复，被认为是正常的。

### 测试代码

```html
<div id="test" style="height: 100vh"><div>
```

```javascript
alert('innerHeight: ' + innerHeight + '\n' + 'test元素高度: ' + $('#test').css('height'));
```

### PC端测试
{% asset_img pc.jpg %}

------------------------------------------

### 移动端测试
{% asset_img phone.jpg %}

------------------------------------------

## 解决思路
> 使用 js 赋值 innerHeight

```js
$('.height-full').css('height', window.innerHeight);
```
