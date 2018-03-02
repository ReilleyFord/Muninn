const readline = require('readline')
const scrape = require('./Modules/scrape.js');
const download = require('./Modules/download.js');
const screenshot = require('./Modules/screenshot.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Some urls for testing
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

/*
  getURL IIFE that grabs a user entered URL then calls doScrapeAndDownload()
  function, screenshotPage() function then closes the interface
*/
(getURL = () => {
  rl.question("Enter a URL for scraping: ", (answer) => {
    if(answer != '') {
      prepareParams(answer);
    } else {
      console.log('URL cannot be blank');
      getURL();
    }
  });
})();

prepareParams = (url) => {
  rl.question('Screenshot the URL? (y/n): ', (answer) => {
    if(answer == 'y' || answer == 'yes') {
      doScrapeAndDownload(url);
      screenshot.screenshotPage(url);
      rl.close();
    } else if(answer == 'n' || answer =='no') {
      doScrapeAndDownload(url);
      rl.close();
    } else {
      console.log('Invalid choice. Only (y/n)');
      prepareParams(url);
    }
  })
}
