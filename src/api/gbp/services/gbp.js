'use strict';

/**
 * gbp service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gbp.gbp');
