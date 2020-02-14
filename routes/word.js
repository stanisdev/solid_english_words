'use string'

class Word {
  prefix = '/word';

  /**
   * Return word
   */
  ['GET: /']() {
    return {
      queryStr: {
        time: { type: 'integer' }
      },
      reply: {
        en: { type: 'string' },
        ru: { type: 'string' }
      },
      async h(req) {
        // const data = await this.db.sendQuery();
        return { ok: true, en: 'occasionally' };
      }
    };
  }

  /**
   * Set complexity
   */
  ['GET: /:id']() {
    return {
      params: {
        id: { type: 'integer', minimum: 1 }
      },
      async h(req) {
        return { ok: true };
      }
    };
  }
}

module.exports = Word;