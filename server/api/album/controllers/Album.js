'use strict';

/**
 * Album.js controller
 *
 * @description: A set of functions called "actions" for managing `Album`.
 */

module.exports = {

  /**
   * Retrieve album records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.album.search(ctx.query);
    } else {
      return strapi.services.album.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a album record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.album.fetch(ctx.params);
  },

  /**
   * Count album records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.album.count(ctx.query);
  },

  /**
   * Create a/an album record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.album.add(ctx.request.body);
  },

  /**
   * Update a/an album record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.album.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an album record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.album.remove(ctx.params);
  }
};
