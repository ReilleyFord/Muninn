const puppeteer = require('puppeteer');
const fs = require('fs');

let date = new Date();
date = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
const headDir = 'Images/Screenshots/';
const dir = headDir + date;

(makeDirs = () => {
  if(!fs.existsSync(headDir))
    fs.mkdirSync(headDir);
  if(!fs.existsSync(dir))
    fs.mkdirSync(dir);
})();

module.exports.screenshotPage = (url) => {
  (async () => {
    let fileName = url.substr(url.lastIndexOf("/") + 1);
    fileName = dir + '/' + fileName + '.png';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({width: 1920, height: 1080});
    await page.goto(url);
    await page.screenshot({path: fileName});
    browser.close();
  })();
}
