const _ = require('lodash');
const marked = require('marked');

// markdown 转换成 文字
let descHandler = function (markdown) {
  return _
    .chain(marked(markdown.toString()))
    // 删除 html 开始和闭合标签
    .replace(/<\/?.+?\/?>/g, '')
    // 替换换行符为逗号
    .replace(/(\n)+/g, ',')
    // 提取前 100 个字
    .truncate({
      length: 100,
      omission: '...'
    });
};

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  beforeSave: async (model) => {
    let { content } = model;
    if (content) {
      model.description = descHandler(content);
    }
  },
  
  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {
  //   console.log('afterSave');
  // },
  
  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},
  
  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, results) => {},
  
  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},
  
  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},
  
  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model) => {
  //   console.log('beforeCreate');
  // },
  
  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, result) => {
  //   console.log('afterCreate');
  // },
  
  // Before updating a value.
  // Fired before an `update` query.
  // 插入，更新，删除 都会触发这个事件。。。
  // 插入时，id 有值，_id 为空（无其他属性）
  // 更新时，id 有值，_id 有值（使用 getUpdate 获得其属性）
  // 删除时，id 为空，_id 为空
  beforeUpdate: async (model) => {
    let { content } = model.getUpdate();
    content && model.update({
      description: descHandler(content)
    });
  }
  
  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {
  //   console.log(model);
  // }
  
  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},
  
  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
};
