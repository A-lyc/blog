---
title: 酷库-echarts
date: 2019-12-17 09:12:50
category: web
tags:
  - 酷库
---

> echarts 是非常强大、知名的图表库
> https://www.echartsjs.com/zh/index.html

## 官方文档阅读心得
> 此库文档非常大...
> 一开始阅读总不知道从哪里下手
> 个人总结以下步骤

1. 确定需求，从 [官方例子](https://www.echartsjs.com/examples/zh/index.html) 中，找到类似的作为参考，或直接复制配置套用
2. 首先确认 series 属性，确认图表类型
3. 模拟数据，设置图表类型对应的 data 属性
4. 增加辅助组件(toolbox、timeline、title 等)
5. 设置细节样式
6. 增加交互逻辑

## map 系列

### 省份地图 label 自定义位置
> 问题描述：
> 经常有需求会要求在省份、城市中心显示 label
> map 系列中 label 的属性 position 和 offset 经测试偏移无效
> 并且一个个 "看着大概偏移" 改麻烦的很..
> 开启 legend 组件，这俩属性才有效，暂不知道为啥
> legend 组件会造成区域上有一个点，也不太好去除

{% asset_img map-label-center-use-label.jpg %}

> 解决办法：
> 放弃使用默认 label，使用 markPoint 模拟 label
> markPoint data 中项的属性 coord 可以自定义 mark 位置(百度坐标拾取器提取经纬度)
> 然后将图标隐藏（sysbom 空图片 或 大小设置为 1都行）

{% asset_img map-label-center-use-markPoint.jpg %}

