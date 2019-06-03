'use strict';

/**
 * Motto.js controller
 *
 * @description: A set of functions called "actions" for managing `Motto`.
 */

module.exports = {

  /**
   * Retrieve motto records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.motto.search(ctx.query);
    } else {
      return strapi.services.motto.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a motto record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.motto.fetch(ctx.params);
  },

  /**
   * Count motto records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.motto.count(ctx.query);
  },

  /**
   * Create a/an motto record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.motto.add(ctx.request.body);
  },

  /**
   * Update a/an motto record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.motto.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an motto record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.motto.remove(ctx.params);
  }
};
