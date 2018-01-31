const readline = require('readline')
const scrape = require('./Modules/scrape.js');
const download = require('./Modules/download.js');
const screenshot = require('./Modules/screenshot.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const urls = [
  'https://www.reddit.com/r/CanadianCars',
  'https://www.instagram.com/the_supercars_of_ottawa',
  'https://www.instagram.com/otcars',
  'https://twitter.com/CarSpottingTO'
];

/*
  Regex for grabbing images from the page source
  Not grabbing .png because almost all of the time they
  are icons and logos of no value.
*/
const reg =  /https\:\/\/([^ ]*?)(\.jpg)/gm;

doScrapeAndDownload = (url) => {
  scrape.scrapePage(url, reg, (arr) => {
    download.downloadImg(arr);
  });
}

rl.question("Enter a URL for scraping: ", (answer) => {
  doScrapeAndDownload(answer);
  screenshot.screenshotPage(answer);
  rl.close();
});
