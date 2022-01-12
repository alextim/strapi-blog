'use strict';

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = {
  featuredImage: {
    populate: {
      media: true,
    },
  },
  tags: {
    fields: [ 'name', 'slug', 'sortOrder' ],
  },
  categories: {
    fields: [ 'name', 'slug', 'sortOrder' ],
  },
  authors: {
    fields: [ 'firstName', 'lastName' ],
  },
  seo: {
    populate: {
      shareImage: {
        fields: [ 'url' ],
      },
      meta: true,
    }
  },
  localizations: {
    fields: ['locale', 'slug'],
  },
};

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    console.log(query);
    const entity = await strapi.entityService.findMany('api::post.post', {
      ...query,
      populate,
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::post.post').findOne(id, {
      ...query,
      populate
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
