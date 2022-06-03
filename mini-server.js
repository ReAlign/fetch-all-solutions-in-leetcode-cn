const fsx = require('fs-extra');
const express = require('express');
const minifyHTML = require('express-minify-html');
const { join } = require('path');

const fetcher = require('./utils/fetcher');

const app = express();

app.set('views', join(__dirname, 'tpl'));
app.set('view engine', 'ejs');

app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true,
  }
}));

app.get('/', async function (req, res) {
  // const list = await fetcher.getSubmittedQuestions();
  // res.render('list', {
  //   list,
  // });
  const data = await fsx.readFile(join(__dirname, 'lc-solutions-sources', 'list.json'));
  res.render('list', {
    list: JSON.parse(data).data,
  });
});

app.get('/get-submissions-by', async function (req, res) {
  const data = await fetcher.getSubmissionsBy(req.query.id);
  res.render('detail', data);
});

app.listen(3300);