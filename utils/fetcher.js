const { join } = require('path');
const ora = require('ora');
const _ = require('lodash');
const request = require('./request');

const {
  jsonParse,
  sleep,
} = require('./_');

const graphql = require('./graphql');

class Fetcher {
  constructor() {
    this.config = {};
    this._initConfig();
  }
  _initConfig() {
    this.config = require(join(__dirname, '..', 'config.js'))();
  }
  _getCookie() {
    return this.config.cookie || '';
  }
  async _send(data) {
    return await request(this._getCookie(), data);
  }
  async getSubmittedQuestions() {
    const list = [];
    const hasNext = (total, i) => total - i * 20 >= 0;

    const Spinner = ora('开始获取');
    const loopGet = async (idx) => {
      Spinner.text = `第 ${idx + 1} 页数据：请求开始`;
      const res = await this._send(graphql.submittedQuestions(idx));
      Spinner.text = `第 ${idx + 1} 页数据：请求完成`;
      if (res.fail) {
        console.log(res.msg);
      } else {
        const totalNum = _.get(res, 'data.userProfileQuestions.totalNum', 0);
        const questions = _.get(res, 'data.userProfileQuestions.questions', []);
        if (questions.length) {
          list.push(...questions);
        }
        if (hasNext(totalNum, idx)) {
          await sleep(300);
          await loopGet(idx + 1);
        } else {
          return;
        }
      }
    };

    Spinner.start();
    await loopGet(0);
    Spinner.stop();

    return list;
  }

  async getSubmissionsBy(id = '') {
    const Spinner = ora('开始获取');
    Spinner.start();
    Spinner.text = `请求开始`;
    const res = await this._send(graphql.submissionsBy(id));
    Spinner.text = `请求完成`;
    Spinner.stop();
    if (res.fail) {
      console.log(res.msg);
    } else {
      const ans = res.data.submissionList.submissions.find(x => x.statusDisplay === 'Accepted');
      if (ans) {
        const id = ans.url.split('/submissions/detail/')[1].slice(0, -1);
        const detail = await this._send(graphql.mySubmissionDetail(id));
        return detail.data.submissionDetail;
      } else {
        return '===';
      }
    }
  }
}

module.exports = new Fetcher();