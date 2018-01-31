const fs = require('fs');
const request = require('request');

let date = new Date();
date = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
const headDir = 'Images/';
const dir = headDir + date;
var exports = module.exports;

(makeDirs = () => {
  if(!fs.existsSync(headDir))
    fs.mkdirSync(headDir);
  if(!fs.existsSync(dir))
    fs.mkdirSync(dir);
})();

exports.downloadImg = (urlArray) => {
  let j = 1;
  download = (url, filename, cb) => {
    request(url, (err, res, body) => {
      if(err) { console.error(err); }
      let writeStream = fs.createWriteStream(dir + '/' + filename)
      request(url).pipe(writeStream);
      writeStream.on('error', (err) => { console.error(err); });
      writeStream.on('close', cb);
    });
  }
  for (let i = 0; i < urlArray.length; i++) {
    let fileExt = urlArray[i].match(/[^\/]*$(.*?)/gm);
    let fileName = date + '-' + fileExt[0];
    download(urlArray[i], fileName, () => {
      console.log('Downloading: ' + fileName);
      console.log('Image ' + j + ' of ' + urlArray.length);
      j++;
      if(j === urlArray.length + 1) {
        console.log('Finished Cluster of ' + urlArray.length + ' Images.');
      }
    });
  }
}
