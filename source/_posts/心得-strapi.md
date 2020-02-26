---
title: 心得-strapi
date: 2019-12-19 14:51:16
category: 后端心得
tags:
  - 经验
---

> strapi 是我一直关注的 node cms 框架
> 我认为他将是未来迈向全栈之路的一个非常重要的 node 框架
> 从 alpha 版本开始一直关注更新
> 逐渐的推出了很多实用性很高，眼前一亮的特性、功能、插件
> 下面是学习笔记：

## 相关链接整理

> 官网：https://strapi.io/
> github: https://github.com/strapi/strapi
> 功能路线图：https://portal.productboard.com/strapi
> 插件库：https://strapi.io/marketplace

## 启用 --inspect 调试

### 步骤
1. 项目根目录新建 index.js（代码在下面直接复制即可）
2. 安装 nodemon (npm i --save-dev nodemon)
3. 在 package.json scripts 中创建 dev 命令 nodemon --inspect index
4. 在 cmd 运行 npm run dev 即可
5. 打开谷歌游览器 node devTools 查看

### 注意
1. 使用上述方法，无法在管理界面添加字段，正确姿势是在 develop 命令下创建好后，转到 dev 命令调试

```javascript
require('strapi/lib/commands/start')()

/**
 *  develop 模式启动文件 --inspect 不好使
 *  build 经过测试应该传入 true
 *  watchAdmin 经过测试应该传入 undefined
 **/
// require('strapi/lib/commands/develop')({
//   build: true,
//   watchAdmin: undefined
// })
```

## 左边侧边栏字段翻译
> version: strapi@3.0.0-beta.18

> 默认创建好模型后，名字是英文的，只有 Users(用户) 字段是中文
> 改变语言后，字段也不会发生变化，一直是英文
> 当前版本已经可以很方便的自定义 admin 管理界面了
> 只需要在项目目录下，新建 admin 目录，里面放入需要替换的文件
> strapi 就会用你自定义的文件替换原有的文件进行打包管理界面

{% asset_img field-i18n-before.jpg %}

----- 手动间隙 -----

### 翻译过程

1. 在项目根目录创建目录 admin/src/translations
2. 将 strapi-admin/admin/src/translations 中的 en.json(必须有), zh-Hans.json(或其他语言) 复制过来
3. 将字段显示的!!复数!!名字复制到 en.json 和 zh-Hans.json 中的 key，value 写需要翻译显示的名字
4. strapi develop --watch-admin(开发管理界面模式看下结果)
5. npm run build(翻译成功后，打包管理员界面)

en.json

```json
{
  "Categories": "Categories",
  "Restaurants": "Restaurants"
}
```

zh-Hans.json

```json
{
  "Categories": "餐厅分类",
  "Restaurants": "餐厅"
}
```

{% asset_img field-i18n-after.jpg %}

----- 手动间隙 -----

### 备注

> en.json 一定要复制并填值，因为 admin/components/LeftMenuLink/index.js 中
> 是根据 en.json 进行判断是否有无 key 值，若没有就不走国际化流程了

```jsx harmony
// in node_modules/strapi-admin/admin/components/LeftMenuLink/index.js

// Check if messageId exists in en locale to prevent warning messages
const content = en[props.label] ? (
  <FormattedMessage
    id={props.label}
    defaultMessage="{label}"
    values={{
      label: `${props.label}`
    }}
    className="linkLabel"
  />
) : (
  <span className="linkLabel">{props.label}</span>
);
```

## 自定义插件
> version: 3.0.0-beta.18.7

> 这个功能是重头戏哈哈
> 日后封装常用功能，快速开发全指着自定义插件
> 研究了半天，有了以下总结
> 注意：strapi 的管理面板是基于 react 的...需要熟悉

### 如何在本地进行开发插件
> [官方文档](https://strapi.io/documentation/3.0.0-beta.x/plugin-development/quick-start.html#development-environment-setup)
> 照着官方文档跑环境就能搭建起来，也比较简单，下面是步骤

> 下面均为在控制台输入
```bash
# 首先你要有一个项目...
npx create-strapi-app my-project

# 进入项目目录
cd my-project

# 创建一个本地插件
strapi generate:plugin my-plugin

# 打开开发管理面板环境
strapi develop --watch-admin

# 然后访问 http://localhost:8000 即可
# 此时已经搭建好了插件开发环境，接下来接插件逻辑即可
```

### 自定义插件开发过程
> 后台管理面板的作用无非就两件事
> 一. 查看或统计数据（展示数据）
> 二. 修改数据（表单提交）

- 思考确定插件功能
- 根据插件功能定义插件数据模型（并非唯一，可多个，在 models 文件夹中）
- 根据插件功能设计接口并绑定控制器（/config/routes.json 和 controllers 目录）
- 思考设计并完成后台管理面板

### 后台管理面板如何发送请求
> strapi 默认有一套权限设置，发送请求会被拦截而获取不到数据（jwt 验证）
> strapi 提供了 helper（strapi-helper-plugin）
> 其中 request 模块是用来发请求的
> 开发者只需要引用，然后使用就可以了
> 不需要权限逻辑，如下

```javascript
import { request } from 'strapi-helper-plugin'

// 返回 Promise
request('/users-permissions/advanced', {
  method: 'get'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})
```