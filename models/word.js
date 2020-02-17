'use string'

const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  en: {
    type: String,
    min: 2,
    required: true
  },
  ru: {
    type: String,
    min: 2
  }
});

module.exports = mongoose.model('Word', wordSchema);