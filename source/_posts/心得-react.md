---
title: 心得-react
category: 前端心得
date: 2020-03-08 14:37:31
tags:
  - react
---

> vue 和 react 是目前前端主要使用的框架
> 在国内还是 vue 用的较多，通常 api 记得也比较熟练
> vue 和 react 的作用和 api 基本差不多...
> 经常容易记混
> 这里记录一下，方便日后提醒

## 优雅的 css module
> react 不像 vue 有 scoped
> create-react-app 默认集成了 css-module
> 个人感觉也是比较好使的一种方式

1. 命名需要已 .module 的方式结尾并在组件中引入 styles 对象

{% asset_img css-module-1.jpg %}

2. 在 jsx 中定义 className

{% asset_img css-module-2.jpg %}

3. 在 css 文件中定义样式
建议使用后代选择器的方式而非短横线，写代码时会方便很多（代码提示）
要覆盖其他组件的样式则用 :global 的形式

{% asset_img css-module-3.jpg %}

4. 覆盖其他组件的样式生成后

{% asset_img css-module-4.jpg %}

5. 后代选择器类名生成后

{% asset_img css-module-5.jpg %}

6. 传入组件的 props 中涉及类名的，也需要使用 styles 对象的方式

{% asset_img css-module-6.jpg %}

---------------------------------------------

## 事件传参以及 this 指向
- render 中写成函数封函数的方式，传递 event 对象和其他参数
{% asset_img react事件传参-1.jpg %}


- 如果事件处理函数中需要 this，则需要定义成下面这种形式（public class fields 语法）
{% asset_img react事件传参-2.jpg %}

## react-router 到底引入哪一个
> 只引入 react-router-dom 即可
- react-router（实现路由的核心）
- react-router-dom（在 react-router 的基础上多了一些组件）

## react-router 传参

- 显式 - path 传参
> 优点：可清楚表达语义，刷新页面参数仍然存在
> 缺点：path 参数位置固定，参数过多可能导致灵活问题
{% asset_img 单页面路由传参-1.jpg %}
{% asset_img 单页面路由传参-2.jpg %}
{% asset_img 单页面路由传参-3.jpg %}

-------------

- 显式 - 查询字符串传参
> 优点：刷新页面参数仍然存在，适合于参数大量的情况
> 缺点：代码上不如 path 传参语义性强
{% asset_img 单页面路由传参-4.jpg %}
{% asset_img 单页面路由传参-5.jpg %}
{% asset_img 单页面路由传参-6.jpg %}

-------------

- 隐式 - state 传参
> 优点：对象传参，写起来简单，保证参数安全性
{% asset_img 单页面路由传参-7.jpg %}
{% asset_img 单页面路由传参-8.jpg %}
{% asset_img 单页面路由传参-9.jpg %}

## react-router js 跳转
- 在组件中，使用 withRouter 后会给 props 设置 history 属性
{% asset_img js跳转-1.jpg %}
{% asset_img js跳转-2.jpg %}
{% asset_img js跳转-3.jpg %}

----------------------------------------

- 在其他 js 中，可以使用 history 库来实现（react-router 有依赖不用自己安装）
{% asset_img js跳转-4.jpg %}
{% asset_img js跳转-5.jpg %}

## react-router 路由嵌套

- 主路由
{% asset_img 嵌套路由-1.jpg %}

-------------

- 子路由
{% asset_img 嵌套路由-2.jpg %}

## react-redux 使用步骤
1. 引入
```bash
npm i --save react-redux
```

2. 创建 store.js 文件，创建 reducer、mapStateToProps、mapDispatchToProps 方法，store 实例
```javascript
let defaultState = { value: 0 }
let reducer = function (state = defaultState, action) {
  switch (action.type) {
    case 'value': {
      return {...state, value: action.value}
    }
    default: {
      return state;
    }
  }
}
let mapStateToProps = function (state) {
  return { ...state }
}
let mapDispatchToProps = function(dispatch) {
  return {
    setValue (value) {
      dispatch({ type: 'value', value })
    }
  }
}
let store = createStore(reducer);

export {
  store, reducer, mapStateToProps, mapDispatchToProps
}
```

3. 将 Provider 组件套在 App 最外侧，同时传入 props store
```jsx harmony
import { store } from './store'
import App from './App'

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.getElementById('root')
)
```

4. 哪个组件需要 store 只需要使用 connect 方法连接即可（react-redux）
```javascript
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../store'

function Page () {
  /** .. **/
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
```

5. 在组件中获取值或者触发 action
```javascript
this.props.value
this.props.setValue(10)
```

## 定义环境变量
- 创建环境变量文件

{% asset_img 环境变量-1.jpg %}

-------------

- 自定义的环境变量要以 "REACT_APP_" 作为开头
{% asset_img 环境变量-2.jpg %}

## 优雅的写 render 函数
> 宗旨为尽量不在 render 中写大量的 js
> 循环等操作尽量单独出来维护

- 简单的 render
{% asset_img 优雅的render函数-1.jpg %}

- 带有循环的 render
{% asset_img 优雅的render函数-2.jpg %}