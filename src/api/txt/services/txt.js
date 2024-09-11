'use strict';

/**
 * txt service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::txt.txt');
