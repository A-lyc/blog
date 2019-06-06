const _ = require('lodash');
const axios = require('axios');
const sizeOf = require('image-size');

let getSize = async url => {
  let { data } = await axios.get(url, {
    responseType: 'arraybuffer'
  });
  return sizeOf(data);
};

/**
 * Lifecycle callbacks for the `File` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // 若上传的是图片，则获取其宽和高，记录到数据库
  beforeSave: async (model) => {
    let { mime, url } = model;
    try {
      // 判断是否是图片格式
      if (_.startsWith(mime, 'image')) {
        let { width, height } = await getSize(url);
        model.width = width;
        model.height = height;
      }
    }
    catch (err) {
      strapi.log.error('获取图片 height 和 width 时出错');
      throw err;
    }
  },
  
  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {},
  
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
  // Fired before `insert` query.
  // beforeCreate: async (model) => {
  // }
  
  // After creating a value.
  // Fired after `insert` query.
  // afterCreate: async (model, result) => {},
  
  // Before updating a value.
  // Fired before an `update` query.
  beforeUpdate: async (model) => {
    let { mime, url } = model;
    try {
      // 判断是否是图片格式
      if (_.startsWith(mime, 'image')) {
        let { width, height } = await getSize(url);
        model.update({
          width,
          height
        });
      }
    }
    catch (err) {
      strapi.log.error('获取图片 height 和 width 时出错');
      throw err;
    }
  }
  
  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {},
  
  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},
  
  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
};
