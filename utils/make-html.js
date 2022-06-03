const PRE_BODY = [
  '<!DOCTYPE html>',
  '<html lang="en">',
  '<head>',
  '<meta charset="UTF-8">',
  '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
  '<title>page</title>',
  '</head>',
  '<body>',
].join('');
const SUF_BODY = [
  '</body>',
  '</html>',
].join('');

module.exports = (json) => {
  /**
   * item
    {
      "translatedTitle": "无重复字符的最长子串",
      "frontendId": "3",
      "titleSlug": "longest-substring-without-repeating-characters",
      "title": "Longest Substring Without Repeating Characters",
      "difficulty": "MEDIUM",
      "lastSubmittedAt": 1651819460,
      "numSubmitted": 48,
      "lastSubmissionSrc": null,
      "__typename": "ProgressQuestionNode"
    },
   */

  const ulTpl = [
    '<ul>',
    json.data.reduce((prev, item) => {
      const {
        frontendId,
        difficulty,
        translatedTitle
      } = item;
      prev += `<li><a href="#" target="_blank">[${difficulty[0]}] ${frontendId}. ${translatedTitle}</a></li>`;
      return prev;
    }, ''),
    '</ul>'].join('');
  return `${PRE_BODY}${ulTpl}${SUF_BODY}`;
};