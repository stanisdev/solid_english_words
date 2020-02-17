'use string'

const config = require('../config');
const glob = require('glob');
const path = require('path');
const { capitalize } = require('lodash');

const files = glob.sync(config.modelsDir + '/*.js').filter(f => !f.endsWith('index.js'));

const models = {};
files.forEach(file => {
  const name = path.basename(file).slice(0, -3);
  models[capitalize(name)] = require(file);
});

module.exports = models;