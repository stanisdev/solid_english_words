'use string'

const fp = require('fastify-plugin');
const mongoose = require('mongoose');

module.exports = fp(async (fastify) => {
  const { host, port, db, options } = fastify.config.mongodb;
  try {
    mongoose.connect(`mongodb://${host}:${port}/${db}`, options); // @todo: add user/password support
  } catch (err) {
    fastify.log.error(err);
  }
  const models = require('../models');
  fastify.decorate('db', models);
});
