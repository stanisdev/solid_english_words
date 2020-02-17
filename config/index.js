'use string'

const path = require('path');
const rootDir = path.dirname(__dirname);

const config = {
  rootDir,
  routesDir: path.join(rootDir, 'routes'),
  modelsDir: path.join(rootDir, 'models'),
  servicesDir: path.join(rootDir, 'services'),
  port: 3000,
  mongodb: {
    host: 'localhost',
    port: 27017,
    db: 'english',
    user: '?',
    password: '?',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
};

module.exports = config;