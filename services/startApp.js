'use string'

const fastify = require('fastify')({ logger: true });
const config = require('../config');
const { port } = config;

fastify.decorate('config', config);

fastify.register(require('./connectToMongodb'));
fastify.register(require('./buildRoutes'));

(async () => {
  try {
    await fastify.listen(port);
    fastify.log.info(`App listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();