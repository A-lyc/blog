const _ = require('lodash')
const marked = require('marked')

// markdown 转换成简短的 description
exports.getArticleDescription = function (markdown = '') {
  return _
    .chain(marked(markdown.toString()))
    // 删除 html 开始和闭合标签
    .replace(/<\/?.+?\/?>/g, '')
    // 替换换行符为逗号
    .replace(/(\n)+/g, ',')
    // 去除开头和结尾的逗号
    .trim(',')
    // 提取前 100 个字
    .truncate({
      length: 100,
      omission: '...'
    })
}
