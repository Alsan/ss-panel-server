'use strict';

const ENDPOINT = '/api/network/info';

describe(ENDPOINT, function () {
  describe('post', function () {
    it('should return error without url', function* () {
      yield api.post(ENDPOINT).expect(400);
    });

    it('should request failure with invalid url', function* () {
      yield api.post(ENDPOINT)
        .send({
          url: 'invalid url',
        })
        .expect(502);
    });

    it('should request success', function* () {
      yield api.post(ENDPOINT)
        .send({
          url: 'https://www.baidu.com',
        })
        .expect(200);
    });
    it('should record success', function* () {
      yield api.post(ENDPOINT)
        .send({
          url: 'https://www.baidu.com',
          record: 'Y',
        })
        .expect(200);
    });
  });
});
