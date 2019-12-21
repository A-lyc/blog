---
title: 心得-window.opener
category: 前端心得
date: 2019-11-08 09:06:15
tag: 
  - 文档
---

> 项目中经常存在着需要跳转网页然后再跳转回来的需求
> 比如说 oauth 登陆，微信支付宝等第三方登陆等
> 若采用通常的链接跳转，会失去当前页面的所有逻辑
> 回调跳转回来时页面也会重新加载
> 用户体验极差，代码逻辑也失去了连贯性

> 终于有一天。。我发现了 window.opener.....

## window.open
> 该方法将打开一个新的网页标签
> 注意：若用户未交互，游览器会阻止该方法的执行（游览器会认为不是用户的操作，认为是广告等）
> 解决：在用户交互事件中调用 window.open（click 等事件）

```javascript
document.getElementById('btn').addEventListener(function (e) {
  window.open('https://www.baidu.com');
})
```

## window.opener
> 当前网页必须由 window.open 打开时才有
> window.opener 指向 window.open 时的父 window 对象

```javascript
window.opener.alert('提示')
```

## 实现（跳转网页回调）

### 父窗口
```javascript
// 定义回调 cb 事件
window.callback = function (params) {
  console.log(params);
};

// 点击按钮触发网页跳转，打开一个新页面
document.getElementById('btn').addEventListener(function (e) {
  window.open('https://www.baidu.com');
})
```

### 子窗口
```javascript
// 触发父窗口回调方法，并传入参数
window.opener.callback(/* any */);

// 关闭当前子窗口
window.close();
```

这样保证了页面的执行顺序，也保证了用户体验。