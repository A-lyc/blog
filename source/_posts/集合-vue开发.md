---
title: 集合-vue开发
category: 集合
date: 2019-11-07 09:06:15
tags:
  - vue
  - vue 酷库
---

## UI库

### element-ui
> https://github.com/ElemeFE/element
> 主要用于 PC 端项目（移动端改改样式大部分组件其实也可以正常使用）
> 其中的 messageBox，loading 组件特别好用

### vant-ui
> https://github.com/youzan/vant
> 主要用于移动端项目
> 拥有大量的实用组件

### cube-ui
> https://github.com/didi/cube-ui
> 主要用于移动端项目
> 拥有大量实用组件

-------------------------------------------------------------

## transition 过渡动画

### vue2-animate
> https://github.com/asika32764/vue2-animate
> 基于 animate.css 封装的进场离场动画

-------------------------------------------------------------

## 表单验证

### vee-validate
> https://github.com/logaretm/vee-validate
> 主要用于表单验证，使用起来十分优雅方便，可嵌套几乎任何 ui 库使用
> 内置了大量的规则，并实现了国际化

-------------------------------------------------------------

## 函数式调用

### vue-create-api ★
> https://github.com/cube-ui/vue-create-api
> 强烈推荐
> 作用是将组件函数式调用，主要用于弹框等，可以设置单例模式。

-------------------------------------------------------------

## 时间操作、格式化

### vue-moment
> https://github.com/brockpetrie/vue-moment
> 将 moment 封装为 js 过滤器

-------------------------------------------------------------

## 离线存储

### vuex-persistedstate
> https://github.com/robinvdvleuten/vuex-persistedstate
> 主要用于 vuex 离线存储
> 例如：存储用户状态 token 等

-------------------------------------------------------------

## 拖拽排序

### Vue.Draggable
> https://github.com/SortableJS/Vue.Draggable
> 用于拖拽排序场景，高星库

-------------------------------------------------------------

## 地图

### vue-baidu-map
> https://github.com/Dafrok/vue-baidu-map
> 作用：组件化实现百度地图的功能
> 备注：推荐使用，使用起来非常优雅

-------------------------------------------------------------

## 图表

### vue-echarts
> https://github.com/ecomfe/vue-echarts
> 作用：对 echarts 的组件封装
> 备注：大量数据时，要注意 vue 数据绑定的性能问题
> 备注：组件提供了 props manual-update 来避免数据绑定

-------------------------------------------------------------

## 国际化

### vue-i18n
> github: https://github.com/kazupon/vue-i18n
> 备注：碰到国际化问题无脑用就行了

#### 改变语言
> 若在组件中用 this.$i18n.locale 改变，则只会改变当前组件
> 要改变 this.$root.$i18n.locale 或 i18n 实例，才会全局改变

## 富文本编辑器
> 下面的这俩都是基于 quill.js（很强大...）
> quill.js 编辑器中的图片默认是已 base64 的形式上传

### vue2-editor
> home: https://www.vue2editor.com/
> github: https://github.com/davidroyer/vue2-editor
> npm: https://www.npmjs.com/package/vue2-editor

> github 比 vue-quill-editor 星少一半多...
> 但是个人感觉比 vue-quill-editor 好使多了...
> 组件内置了图片添加和删除事件，可轻松实现各种逻辑

### vue-quill-editor
> home: https://github.surmon.me/vue-quill-editor
> github: https://github.com/surmon-china/vue-quill-editor
> npm: https://www.npmjs.com/package/vue-quill-editor