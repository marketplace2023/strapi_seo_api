'use strict';

/**
 * post-client service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::post-client.post-client');
