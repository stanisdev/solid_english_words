'use string'

const path = require('path');
const rootDir = path.dirname(__dirname);

const config = {
  rootDir,
  routesDir: path.join(rootDir, 'routes'),
  modelsDir: path.join(rootDir, 'models'),
  servicesDir: path.join(rootDir, 'services'),
};

module.exports = config;