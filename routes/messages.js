var express = require('express');
var router = express.Router();

var Message = require('../models/message');

/* GET home page. */
router.post('/', function(req, res, next) {
    var message = new Message({
       content: req.body.content
    });
    message.save(function (err, result) {
        if (err){
            return res.status(500).json({
                title: 'An error has occurred',
                error: err
            });
        }
        res.status(201).jason({
           message: 'Saved Message',
           obj: result
        });
    });
});

module.exports = router;
