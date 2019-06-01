'use strict';
const { promisify } = require('util');

/**
 * Article.js controller
 *
 * @description: A set of functions called "actions" for managing `Article`.
 */

module.exports = {
  
  /**
   * Retrieve article records.
   *
   * @return {Object|Array}
   */
  
  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.article.search(ctx.query);
    }
    else {
      return strapi.services.article.fetchAll(ctx.query);
    }
  },
  
  /**
   * Retrieve a article record.
   *
   * @return {Object}
   */
  
  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }
    
    // 游览量自增
    let article = await strapi.services.article.fetch(ctx.params);
    
    /**
     *  备注：目前自增时会修改 updatedAt，暂无找到办法
     **/
    article.pv++;
    await promisify(article.save).call(article);
    
    return article;
  },
  
  /**
   * Count article records.
   *
   * @return {Number}
   */
  
  count: async (ctx) => {
    return strapi.services.article.count(ctx.query);
  },
  
  /**
   * Create a/an article record.
   *
   * @return {Object}
   */
  
  create: async (ctx) => {
    return strapi.services.article.add(ctx.request.body);
  },
  
  /**
   * Update a/an article record.
   *
   * @return {Object}
   */
  
  update: async (ctx, next) => {
    return strapi.services.article.edit(ctx.params, ctx.request.body);
  },
  
  /**
   * Destroy a/an article record.
   *
   * @return {Object}
   */
  
  destroy: async (ctx, next) => {
    return strapi.services.article.remove(ctx.params);
  }
};
