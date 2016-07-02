// bing.js

var express = require('express');
var router = express.Router();
var Bing = require('node-bing-api')({
    accKey: 'Yqe+xe/Akfhmg5J2Gb89jrjs2bGsydbLzGGC9p/sGUg'
});

// global variable to keep the recent searches

var storeManager = {
    recentArr: new Array(10),
    next: 0,
    update: function (value) {
        if(this.next === (this.recentArr.length - 1)) {
            this.next = 0;
        }
        var temp = {
            query: value,
            time: new Date().toGMTString()
        }
        this.recentArr[this.next] = temp;
        this.next++;
    }
}

router.get('/', function (req, res, next) {
    res.send({
        msg: 'follow the instructions from home page and look for some images.'
    });
    res.end();
});

// search image endpoint
router.get('/api/image/:value', function (req, res, next) {
    var value = req.params.value;
    if(value) {
        storeManager.update(value);     // update recent search query
    } else {
        next();
    }
    
    if(Number(req.query.offset)) {
        var offset = Number(req.query.offset);
    }
    
    // offset * 10 - pagination logic
    Bing.images(value, { top: 10, skip: (offset * 10) || 0 }, function (err, data, body) {
        if(err) {
            res.send({
                msg: 'Sorry! Search engine is not in good mood!'
            });
            res.end();
        } else {
            res.send(body.d.results);
            res.end();
        }
    });

}, function(req, res, next) {
    res.send({
        msg: 'Blank query.. Really..If you want some, ask some!'
    });
    res.end();
});

// recent search
router.get('/api/latest', function (req, res, next) {
    var tempArr = storeManager.recentArr;
    var arr = [];
    for(var i =0; i < tempArr.length; i++) {
        if(tempArr[i] !== undefined) {
            arr.push(tempArr[i]);
        }
    }
    if(arr.length !== 0) {
        res.send(arr);
        res.end();
    } else {
        next();
    }
}, function (req, res, next) {
    res.send({
        msg: 'Wow! no one is using my search engine!'
    });
    res.end();
});

module.exports = router;