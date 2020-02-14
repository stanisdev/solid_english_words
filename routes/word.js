'use string'

class Word {
  constructor() {}

  /**
   * Return word
   */
  ['GET: /']() {
    return {
      queryStr: {
        name: { type: 'string' }
      },
      body: {
        success: { type: 'boolean' }
      },
      async h(req) {
        // const data = await this.db.sendQuery();
        return { ok: true, 3: 5 };
      }
    };
  }

  /**
   * Set complexity
   */
  ['GET: /:id']() {
    return {
      async h(req) {
        return { ok: true };
      }
    };
  }
}

module.exports = Word;