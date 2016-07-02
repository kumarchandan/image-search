var express = require('express');
var router = express.Router();

var Flickr = require('flickrapi');
var flickrOptions = {
  api_key: process.env.api_key,
  secret: process.env.secret
};

/* GET home page. */
router.get('/api/image/:value', function (req, res, next) {
  var value = req.params.value;
  var offset = Number(req.query.offset) || 1;

  Flickr.tokenOnly(flickrOptions, function (err, flickr) {
    // use flickr methods now
    flickr.photos.search(
      {
        text: value,    // value will replace it
        page: offset,         // offset will replace it, for pagination
        per_page: 20
      },
      function (err, data) {
        if(err) {
          throw new Error(err);
        }
        // results came
        var out = [];
        var resArr = data.photos.photo;
        var len = data.photos.photo.length;

        for(var i = 0; i < len; i++) {
          var obj = {
            title: resArr[i].title,
            img_url: 'https://farm'+ resArr[i].farm +'.staticflickr.com/'+ resArr[i].server +'/'+ resArr[i].id +'_'+ resArr[i].secret +'.jpg'
          }
          out.push(obj);
        }

        // send data to client
        res.send(out);
        res.end();
      });
   });
});

module.exports = router;
