---
title: 酷库-解决js计算精度问题
category: 酷库
date: 2020-04-15 20:06:20
tags:
  - 计算精度
---

## js 精度问题例子
> 就问你蛋不蛋疼...
```javascript
console.log(0.1 + 0.2)
// => 0.30000000000000004

console.log(45685 * 666.7)
// => 30458189.500000004
```

## mathjs
> 此库是 javascript 数学库
> github: https://github.com/josdejong/mathjs
> npm: https://www.npmjs.com/package/mathjs
> 文档：https://mathjs.org/docs/datatypes/bignumbers.html

> 例子如下
> 有两种使用方式，选其一使用即可

```javascript
import * as math from 'mathjs'
  
console.log(
  math.add(
    math.bignumber(0.1),
    math.bignumber(0.2)
  ).toNumber()
)
// => 0.3

console.log(
  math.multiply(
    math.bignumber(45685),
    math.bignumber(666.7)
  ).toNumber()
)
// => 30458189.5
```

```javascript
import { create, all } from 'mathjs'

/** 创建一个 math 新实例 **/
const math = create(all)

math.config({
  number: 'BigNumber',
  precision: 64
})

console.log(
  math.evaluate('0.1 + 0.2').toNumber()
)
// => 0.3

console.log(
  math.evaluate('45685 * 666.7').toNumber()
)
// => 30458189.5
```