---
title: 经验-strapi
date: 2019-12-19 14:51:16
category: 经验
tags:
  - node
  - cms
  - react
---

> strapi 是我一直关注的 node "无头" cms 框架
> 我认为他将是未来迈向全栈之路的一个非常重要的 node 框架
> 从 alpha 版本开始一直关注更新
> 逐渐的推出了很多实用性很高，眼前一亮的特性、功能、插件
> 下面是学习笔记：

## 资料 - 相关链接整理

> 官网：https://strapi.io/
> github: https://github.com/strapi/strapi
> 功能路线图：https://portal.productboard.com/strapi
> 插件库：https://strapi.io/marketplace

## 心得 - 启用 --inspect 调试

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

## 心得 - 后台左边侧边栏模型名称翻译
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

## 心得 - 后台左侧侧边栏中隐藏指定模型管理
> version: 3.0.0-beta.18.7

> ！！！ 目前没有发现从模型配置中隐藏的方法 ！！！
> 负责可视化管理数据的插件是 strapi-plugin-content-manager 这个包
> 在其 services/ContentTypes.js 中重写 HIDDEN_CONTENT_TYPES 常量即可实现
> 步骤如下

- 首先你要有一个项目，并且有自定义的模型字段
- 在项目根目录 extensions 文件夹中创建 content-manager/services/ContentTypes.js 文件
- 复制 node_modules/strapi-plugin-content-manager/services/ContentTypes.js 中的代码
- 黏贴到 extensions/content-manager/services/ContentTypes.js 中
- 修改 ContentTypes.js 中的依赖包的路径，使其路径正确，下面有例子
- 找到 HIDDEN_CONTENT_TYPES 常量，新增需要隐藏的模型，下面有例子

```javascript
/** 修改依赖路径 **/
const storeUtils = require('strapi-plugin-content-manager/services/utils/store')
const { pickSchemaFields } = require('strapi-plugin-content-manager/services/utils/schema')
```

```javascript
/** 重写需要隐藏的模型 **/
const HIDDEN_CONTENT_TYPES = [
  /** 原有的 **/
  'strapi::admin',
  'plugins::upload.file',
  'plugins::users-permissions.permission',
  'plugins::users-permissions.role',
  
  /** 以下是新增的 **/
  'plugins::config.config',
  /** application 代表项目中创建的模型 **/
  'application::house.house'
]
```

## 心得 - 禁止在后台中修改删除模型字段
> 在模型配置中(xxx.settings.json)
> 给字段 configurable 属性设置为 false

## 心得 - strapi.store（配置存储库）
> strapi 提供了这么一个 api 来存储配置信息（存到数据库里的 core_store 表中）
> 但是官方文档中没有任何描述
> 我通过查看了官方插件，学习到了这个 api 的使用方法
> 如下：

```javascript
module.exports = async () => {
  /**
   *  存数据库的命名规则为
   *  type_[name_]key
   **/
  const store = strapi.store({
    /** 开发环境和线上环境可以分开不同的配置 **/
    environment: '',
    
    /**
     *  type 一定要填写
     *  存数据库时会已 type 作为前缀
     **/
    type: 'plugin',
    
    /**
     *  name 不需要一定填写
     *  存数据库时会把 name 作为第二前缀
     **/
    name: 'config'
  })
  
  // 设置储存库中的字段
  await store.set({
    key: 'test',
    value: [ 1, 2, 3, 4 ]
  })
  
  // 获取储存库中的字段
  console.log(await store.get({ key: 'test' }))
  // => [ 1, 2, 3, 4 ]
}
```

## 心得 - 富文本 html 编辑器
> version: 3.1.4
> 目前自带的富文本编辑器是仅支持 markdown 语法的
> 但是 html 编辑器在项目中才是最常用的....
> 官方方案
> https://strapi.io/blog/how-to-change-the-wysiwyg-in-strapi

### 注意：
- CKEditor 或 自定义的组件当用户输入时，需要手动调用 props.onChange 方法，参数如下：

```javascript
onChange({ target: { name: props.name, value: '用户输入的内容' } })
```

## 自定义插件 - 环境搭建
> version: 3.0.0-beta.18.7

> 这个功能是重头戏哈哈
> 日后封装常用功能，快速开发全指着自定义插件
> 研究了半天，有了以下总结
> 注意：strapi 的管理面板是基于 react 的...需要熟悉

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

# 然后访问 http://localhost:8000/admin 即可
# 此时已经搭建好了插件开发环境，接下来接插件逻辑即可
```

## 自定义插件 - 插件开发思路
> 后台管理面板的作用无非就两件事
> 一. 查看或统计数据（展示数据）
> 二. 修改数据（表单提交）

- 思考确定插件功能
- 根据插件功能定义插件数据模型（并非唯一，可多个，在 models 文件夹中）
- 根据插件功能设计接口并绑定控制器（/config/routes.json 和 controllers 目录）
- 思考设计并完成后台管理面板

## 自定义插件 - 后台管理面板如何发送请求
> strapi 默认有一套权限设置，发送请求会被拦截获取不到数据（jwt 验证）
> strapi 提供了 helper（strapi-helper-plugin）
> 其中 request 模块是用来发请求的
> 开发者只需要引用，然后使用就可以了
> 不需要了解权限逻辑，对开发透明
> 如下：

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

## 自定义插件 - 内部配置（储存库）
> 可以用 strapi.store 来存储内部配置
> strapi.store 上面介绍过了
> 参考了官方插件代码中的使用
> 需要注意的是：
> type 都是 plugin
> name 都是 插件名称

```javascript
const pluginStore = strapi.store({
  environment: '',
  type: 'plugin',
  name: 'users-permissions',
});
```
