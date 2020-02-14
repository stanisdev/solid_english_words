'use string'

const { routesDir } = require('../config');
const glob = require('glob');

module.exports = (fastify) => {
  const files = glob.sync(routesDir + '/*.js');

  files.forEach((filePath) => {
    const Class = require(filePath);
    const instance = new Class();
    const methods = Object.getOwnPropertyNames(Class.prototype).filter(m => m !== 'constructor');
    
    methods.forEach(methodName => {
      const routeParams = instance[methodName]();
      let [httpMethod, url] = methodName.split(': ');

      fastify[httpMethod.toLowerCase()](url, routeParams.h);
    });
  });
};