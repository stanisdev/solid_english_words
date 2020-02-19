'use string'

const mongoose = require('mongoose');

const explanationSchema = new mongoose.Schema({
  useСase: {
    type: String,
    required: true
  },
  examples: {
    type: [String],
    required: true
  },
  synonyms: [String]
});

const wordSchema = new mongoose.Schema({
  en: {
    type: String,
    min: 2,
    required: true,
    unique: true
  },
  ru: {
    type: String,
    min: 2
  },
  transcription: {
    type: String,
    required: true
  },
  /**
   * Part of speech
   */
  ps: {
    type: String,
    enum: ['noun', 'verb', 'adjective', 'adverb', 'conjunction', 'preposition', 'pronoun', 'interjection'],
    required: true
  },
  explanation: {
    type: [explanationSchema],
    required: true
  },
  synonyms: [String],
  pronunciation: String,
  images: [String],
  description: String,
  /**
   * Degree of knowledge
   */
  dk: {
    type: Number,
    default: 10 // max 10, min 0
  }
});

module.exports = mongoose.model('Word', wordSchema);