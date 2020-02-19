'use string'

const fp = require('fastify-plugin');
const Boom = require('@hapi/boom');

module.exports = fp(async (fastify) => {
  fastify.decorate('Boom', Boom);

  fastify.setErrorHandler((error, request, reply) => {
    let status = 500, message = 'Unknown server error';
    if (error instanceof Error) {
      
      if (error.isBoom) {
        const { statusCode, message: msg } = error.output.payload;
        status = statusCode;
        message = msg;
      } else { // usual error
        message = error.message;
      }
    }
    fastify.log.error(error); // @todo: for Boom use "log.info"
    reply.status(status).send({ ok: false, message });
  });
});