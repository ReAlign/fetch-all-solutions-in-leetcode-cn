const superagent = require('superagent');

const {
  jsonParse,
} = require('./_');

const URL_BASE = 'https://leetcode.cn';
const URL_GRAPHQL = `${URL_BASE}/graphql/`;

module.exports = async function (cookie, data) {
  try {
    const res = await superagent
      .post(URL_GRAPHQL)
      .send(data)
      .set('cookie', cookie);
    return jsonParse(res.text);
  } catch (e) {
    return {
      fail: true,
      msg: e,
    };
  }
};