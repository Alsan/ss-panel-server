'use strict';

const _ = require('lodash');

const errors = require('../../lib/errors');
const birthday = require('../../service/birthday');

let birthFormat = function (birth) {
  let filter = [
    'birth_id',
    'title',
    'type',
    'year',
    'month',
    'day',
    'days',
    'date',
    'zodiac',
    'age',
    'countdown',
    'constellation',
  ];
  return _.pick(birth, filter);
};

// 判断所有权
let getBirthAsync = function* (user_id, birth_id) {
  let birth = yield birthday.getBirthAsync(birth_id);
  if (!birth || birth.user_id !== user_id) {
    throw new errors.NotFound('未找到相关生日');
  }
  return birth;
};

module.exports = {
  *get(req, res) {
    let user_id = req.session.user.user_id;
    let birth_id = req.query.birth_id;

    let birth = yield getBirthAsync(user_id, birth_id);
    res.json(birthFormat((birth)));
  },

  *put(req, res) {
    let user_id = req.session.user.user_id;
    let birth_id = req.body.birth_id;
    let data = _.pick(req.body, ['title', 'type', 'date']);

    yield getBirthAsync(user_id, birth_id);
    let birth = yield birthday.updateBirthAsync(birth_id, data);
    res.json(birthFormat(birth));
  },

  *delete(req, res) {
    let user_id = req.session.user.user_id;
    let birth_id = req.query.birth_id;

    yield getBirthAsync(user_id, birth_id);
    yield birthday.removeBirthAsync(birth_id);
    res.json({result: true});
  },
};
