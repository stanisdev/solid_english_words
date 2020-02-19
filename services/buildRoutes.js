'use string'

const fp = require('fastify-plugin');
const glob = require('glob');

module.exports = fp(async (fastify) => {
  const { routesDir } = fastify.config; // @todo: rewrite as a class
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
      if (routeParams.hasOwnProperty('body')) { // body
        const body = {
          type: 'object',
          properties: {}
        };
        Object.keys(routeParams.body).forEach(fieldName => {
          body.properties[fieldName] = routeParams.body[fieldName];
        });
        const symbols = Object.getOwnPropertySymbols(routeParams.body);
        const required = symbols.find(symbol => symbol.toString().includes('required'));
        if (typeof required == 'symbol') { // required fields

          body.required = [];
          routeParams.body[required].forEach(fieldName => body.required.push(fieldName));
        }
        schema.body = body;
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
});