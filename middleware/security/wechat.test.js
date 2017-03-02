'use strict';

const plugins = require('../../lib/test/plugin');

let user_plugin = plugins.user();

describe('server/middleware/security/wechat', function () {
  describe('birthday', function () {
    before(function* () {
      yield user_plugin.before('birthday');
    });

    after(function* () {
      yield user_plugin.after();
    });

    let base_path = '/api/birthday/births';

    it('should throw unauthorized error', function* () {
      yield api.get(base_path).expect(401);
    });

    it('should return birth list', function* () {
      yield api.get(base_path)
        .use(user_plugin.plugin())
        .expect(200);
    });
  });
});
