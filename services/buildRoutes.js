'use string'

const { routesDir } = require('../config');
const glob = require('glob');

module.exports = (fastify) => {
  const files = glob.sync(routesDir + '/*.js');

  files.forEach(filePath => {
    const Class = require(filePath);
    const instance = new Class();
    const methods = Object.getOwnPropertyNames(Class.prototype).filter(m => m !== 'constructor');
    
    methods.forEach(methodName => {
      const routeParams = instance[methodName]();
      let [httpMethod, url] = methodName.split(': ');

      if (instance.hasOwnProperty('prefix')) { // prefix
        const { prefix } = instance;
        if (url.length < 2) {
          url = prefix;
        } else {
          url = prefix + url;
        } 
      }

      let response = { // response
        ok: { type: 'boolean' }
      };
      const { reply } = routeParams;
      if (reply instanceof Object) {
        response = {...response, ...reply};
      }
      const schema = {
        response: {
          200: {
            type: 'object',
            properties: response
          }
        }
      };

      if (routeParams.hasOwnProperty('queryStr')) { // query parameters
        schema.querystring = routeParams.queryStr;
      }
      if (routeParams.hasOwnProperty('params')) { // URL parameters
        schema.params = {
          type: 'object',
          properties: routeParams.params
        };
      }

      const options = { // Prepared route options
        method: httpMethod,
        url,
        handler: routeParams.h
      };
      if (Object.keys(schema).length > 0) {
        options.schema = schema;
      }
      fastify.route(options);
    });
  });
};