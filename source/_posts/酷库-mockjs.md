---
title: 酷库-mockjs
category: 酷库
date: 2020-03-12 09:54:09
tags:
  - mock 数据
---

> 模拟数据应该是开发中必有的情况= =

## mockjs
> home：http://mockjs.com
> github：https://github.com/nuysoft/Mock
> npm：https://www.npmjs.com/package/mockjs
> 文档查阅：https://github.com/nuysoft/Mock/wiki

> 示例查阅：http://mockjs.com/examples.html

## Random 单词记录
> 记录着常用的单词
> 注：字符串类型通常分为英文和中文，中文是在英文的单词基础上前面加 'c'
> ex: title, ctitle

### 标题（title，ctitle）
```javascript
// Random.title( min?, max? )
Random.title()
// => "Ploinc Trus Ukvfcqv"
Random.title(3, 5)
// => "Fllryhnhn Uouqco Adhmx Jnux"

// Random.ctitle( min?, max? )
Random.ctitle()
// => "期和效除亲专"
Random.ctitle(3, 5)
// => "北二亲"
```

### 段落描述（paragraph，cparagraph，sentence, csentence）
> min 和 max 代表的是几句话，而为字符串个数

```javascript
// Random.paragraph( min?, max? )
// Random.sentence( min?, max? )
Random.paragraph()
Random.sentence()
// => "Uspwcg symp bbn dydjdkgmh odhxg ppfmw sxcqcc ixacnm ouubxyh ohdq hdnytokmq jpekjv sgfodecmp."

// Random.cparagraph( min?, max? )
// Random.csentence( min?, max? )
Random.cparagraph()
Random.csentence()
// => "算对但放经被将始参文工价适。等开飞之提正与九入养出交装达指。者住小机价更系头日体活七你马王报设。保车技置思走少必问样总主米时四选群土。"
```

### 图片（image、dataImage）
```javascript
// Random.image( size, background, foreground, format, text )
Random.image('200x100', '#894FC4', '#FFF', 'png', '!')
// => 返回一张真实的网络图片路径

// Random.dataImage( size, text )
Random.dataImage('200x100', 'Hello Mock.js!')
// => base64 格式的图片
```

### 时间（date，time，datatime，now）
> format 传 T 则会转为毫秒值

```javascript
// Random.date( format? )
Random.date()
// => "2008-09-07"
Random.date('yy-MM-dd')
// => "91-05-09"

// Random.time( format? )
Random.time()
// => "09:38:34"
Random.time('HH:mm:ss')
// => "01:45:11"

// Random.datetime( format? )
Random.datetime()
// => "1977-11-12 07:01:43"
Random.datetime('yyyy-MM-dd A HH:mm:ss')
// => "1999-08-30 PM 15:20:22"

// Random.now( unit?, format? )
Random.now()
// => "2020-03-12 09:58:09"
Random.now('hour')
// => "2020-03-12 90:00:00"
Random.now('yyyy-MM-dd HH:mm:ss SS')
// => "2020-03-12 09:58:09 206"
```

### id标识（id）
> 不光有数字，可能会有 X 字符串
```javascript
Random.id()
// => "51000019730908273X"
```

### 数字（integer，float）
```javascript
// Random.integer( min?, max? )
Random.integer()
// => -7897216954377768
Random.integer(60, 100)
// => 92

// Random.float( min?, max?, dmin?, dmax? )
Random.float()
// => -996747130985524.9
Random.float(60, 100, 3, 5)
// => 87.3435
```

### 布尔（boolean）
```javascript
// Random.boolean( min?, max?, current? )
Random.boolean()
// => false
Random.boolean(1, 9, true)
// => false
```

### 人名（name，cname）
```javascript
// Random.name( middle? )
Random.name()
// => "Matthew Jones"
Random.name(true)
// => "Ronald Sharon Martinez"

Random.cname()
// => "武超"
```

### 地区（region，province，city，county）
```javascript
Random.region()
// => "华中"

Random.province()
// => "吉林省"

Random.city()
// => "石家庄市"
Random.city(true)
// => "海南省 三亚市"

Random.county()
// => "西贡区"
Random.county(true)
// => "广东省 中山市 -"
```
