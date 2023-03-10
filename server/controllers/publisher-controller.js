'use strict';
const { getPluginService } = require('../utils/getPluginService');

module.exports = {
  async getWelcomeMessage(ctx) {
    ctx.body = await strapi
      .plugin('nova-publisher')
      .service('publisher')
      .getWelcomeMessage();
  },
  async getInstances(ctx) {
    ctx.body = await strapi
      .plugin('nova-publisher')
      .service('publisher')
      .getInstances();
  },
  async check(ctx) {
    ctx.body = await strapi
      .plugin('nova-publisher')
      .service('publisher')
      .check(ctx);
  },
  async publish(ctx) {
    ctx.body = await strapi
      .plugin('nova-publisher')
      .service('publisher')
      .publish(ctx.request.body.id);
  },
  async createPublisherComponent(ctx) {
    ctx.body = await strapi
      .plugin('nova-publisher')
      .service('publisher')
      .createPublisherComponent(ctx);
  },
  async fetchPublisherComponent(ctx) {
    ctx.body = await strapi
      .plugin('nova-publisher')
      .service('publisher')
      .fetchPublisherComponent();
  },
};
