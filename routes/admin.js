'use string'

class Admin {
  prefix = '/admin';

  /**
   * Add word
   */
  ['PUT: /add']() {
    return {
      body: {
        en: { type: 'string', minimum: 2 },
        ru: { type: 'string' },
        transcription: { type: 'string' },
        ps: { type: 'string' },
        explanation: {
          type: 'array',
          items: {
            type: 'object',
            required: ['useСase', 'examples'],
            properties: {
              useСase: { type: 'string' },
              examples: {
                type: 'array', items: { type: 'string' }
              },
              synonyms: {
                type: 'array', items: { type: 'string' }
              }
            }
          }
        },
        synonyms: {
          type: 'array',
          items: { type: 'string' }
        },
        pronunciation: { type: 'string' },
        images: {
          type: 'array',
          items: { type: 'string' }
        },
        description: { type: 'string' },
        [Symbol('required')]: ['en', 'transcription', 'ps', 'explanation']
      },
      async h(req) {
        const { Word } = this.db;
        const { en } = req.body;
        const check = await Word.findOne({ en: en.trim() });

        if (check instanceof Object) {
          throw this.Boom.badRequest(`The word "${en}" was already added`);
        }
        const word = new Word(req.body);
        await word.save();
        return { ok: true };
      }
    };
  }
}

module.exports = Admin;