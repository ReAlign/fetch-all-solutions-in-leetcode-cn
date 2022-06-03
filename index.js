const fsx = require('fs-extra');
const { join } = require('path');
const makeHtml = require('./utils/make-html');

const dir = join(__dirname, 'lc-solutions-sources');
const jsonPath = join(dir, 'list.json');
const pagePath = join(dir, 'list.html');

const fetcher = require('./utils/fetcher');

const updateSolutionsData = async () => {
  await fsx.ensureDir(dir);
  const x = await fetcher.getSubmittedQuestions();
  const json = {
    data: x,
  };
  await fsx.writeFile(jsonPath, JSON.stringify(json, null, 2));
};

const updateSolutionsPage = async () => {
  const x = await fsx.readFile(jsonPath);
  await fsx.writeFile(pagePath, makeHtml(JSON.parse(x)));
};

updateSolutionsData();
// updateSolutionsPage();