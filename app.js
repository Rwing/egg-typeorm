'use strict';

const typeorm = require('./lib/typeorm');
require("reflect-metadata");

module.exports = app => {
  if (app.config.typeorm.app) typeorm(app);
};