'use strict';

/**
 * review-client service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::review-client.review-client');
