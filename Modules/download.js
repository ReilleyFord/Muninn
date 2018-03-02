const fs = require('fs');
const request = require('request');

let date = new Date();
date = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
const PARENT_DIR = 'Images/';
const CHILD_DIR = PARENT_DIR + date;
var exports = module.exports;

(makeDirs = () => {
  if(!fs.existsSync(PARENT_DIR))
    fs.mkdirSync(PARENT_DIR);
  if(!fs.existsSync(CHILD_DIR))
    fs.mkdirSync(CHILD_DIR);
})();

exports.downloadImg = (urlArray) => {
  let j = 1;
  download = (url, filename, cb) => {
    request(url, (err, res, body) => {
      if(err) { console.error(err); }
      let writeStream = fs.createWriteStream(CHILD_DIR + '/' + filename)
      request(url).pipe(writeStream);
      writeStream.on('error', (err) => { console.error(err); });
      writeStream.on('close', cb);
    });
  }
  for (let i = 0; i < urlArray.length; i++) {
    let fileExt = urlArray[i].match(/[^\/]*$(.*?)/gm);
    let fileName = date + '-' + fileExt[0];
    download(urlArray[i], fileName, () => {
      console.log('downloading: ' + fileName);
      console.log('finished image ' + j + ' of ' + urlArray.length);
      j++;
      if(j === urlArray.length + 1) {
        console.log('finished cluster of ' + urlArray.length + ' Images.');
      }
    });
  }
}
