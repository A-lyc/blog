const { getArticleDescription } = require('../../../utils')

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model) => {
  // },
  
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
  beforeUpdate: async (model) => {
    let { content } = model.getUpdate()
    let isUpdate = Boolean(content)
    let isSave = !isUpdate
    let description = null
    
    if (isSave) {
      let { content } = await model.findOne()
      description = getArticleDescription(content)
    }
    if (isUpdate) {
      description = getArticleDescription(content || '')
    }
    
    model.update({ description })
  }
  
  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {
  // }
  
  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},
  
  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
}
