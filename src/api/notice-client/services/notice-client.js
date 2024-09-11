'use strict';

/**
 * notice-client service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::notice-client.notice-client');
