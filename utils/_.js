module.exports = {
  jsonParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  },
  sleep(delay) {
    return new Promise((rs) => {
      setTimeout(() => {
        rs();
      }, delay);
    });
  },
};