const puppeteer = require('puppeteer');
const fs = require('fs');

let date = new Date();
date = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
const PARENT_DIR = 'Images/Screenshots/';
const CHILD_DIR = PARENT_DIR + date;

(makeDirs = () => {
  if(!fs.existsSync(PARENT_DIR))
    fs.mkdirSync(PARENT_DIR);
  if(!fs.existsSync(CHILD_DIR))
    fs.mkdirSync(CHILD_DIR);
})();

module.exports.screenshotPage = (url) => {
  (async () => {
    let fileName = url.substr(url.lastIndexOf("/") + 1);
    fileName = CHILD_DIR + '/' + fileName + '.png';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({width: 1920, height: 1080});
    await page.goto(url);
    await page.screenshot({path: fileName});
    console.log('Took Screenshot: ' + fileName);
    browser.close();
  })();
}
