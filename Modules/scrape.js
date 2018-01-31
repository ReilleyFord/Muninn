const request = require('request');
var exports = module.exports;


exports.scrapePage = (url, reg, cb) => {
    request({
      url: url,
      json: true
    }, (err, body) => {
    if(err) { console.error(err); }
    let bodyText = body.body;
    let urlArray = bodyText.match(reg);
    urlArray.forEach(url => {
      console.log(url);
    });
    cb(urlArray);
  });
}
