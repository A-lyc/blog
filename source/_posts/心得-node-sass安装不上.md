---
title: 心得-node-sass安装不上
cateogry: 前端心得
date: 2020-01-30 13:17:52
tags:
  - npm
---

> 我习惯在项目中使用 sass 作为 css 高级语言
> 通常 sass 基于 node-sass 这个库
> 但是在实际情况下，node-sass 经常会因为各种各样的问题安装不上
> 原因有缺少啥 gyp 环境，node-sass 下载超时等
> 这里记录一下，以后出现后，跟着跑即可

> 参考网址
> https://www.jianshu.com/p/92afe92db99f

```bash
# 若 npm 速度慢建议换源
npm i -g nrm
nrm use taobao

npm install -g node-gyp
npm install --global --production windows-build-tools
npm uninstall node-sass
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```
