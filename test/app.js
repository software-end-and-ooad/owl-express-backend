import http from 'http';
import assert from 'assert';

import '../app.js';

describe('Test Node Server', () => {
  it('should return 404', done => {
    http.get('http://localhost:3000/', res => {
            assert.equal(404, res.statusCode);
            done();
          });
      });
});
