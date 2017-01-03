var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var request = require('request');
var stream = fs.createWriteStream('fb.jpg');

var User = require('../models/user');

router.post('/', function(req, res, next) {
    return res.status(500).json({
        title: 'An error occurred',
        err: {message: 'user authentication failed'}
    });
});

router.post('/facebook', function (req, res, next) {
    User.findOne({email: req.body.email}, function (err, user){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                err: {message: 'user authentication failed'}
            });
        }
        if (user){
            var token = jwt.sign({user: user}, 'tmack42sasiedu', {expiresIn: 7200});
            return res.status(201).json({
                title: "good",
                message: 'login successful',
                token: token,
                userId: user._id
            });
        }
        request(req.body.image, null, function (err2, res2, body2) {
            if(err2){
                return res.status(500).json({
                    title: 'An error occurred',
                    err: {message: 'server error try again later'}
                });
            }
            var fb_user = new User({
                userName: req.body.firstName,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                image: new Buffer(fs.readFileSync('fb.jpg')).toString('base64'),
                favView: false,
                watchView: false,
                recentView: false,
                year: '2017',
                country: 'South Africa',
                bio: ""
            });
            fb_user.save(function (err, data) {
                if (err){
                    return res.status(500).json({
                        title: 'An error occurred',
                        err: {message: 'server error try again later'}
                    });
                }
                var token = jwt.sign({user: fb_user}, 'tmack42sasiedu', {expiresIn: 7200});
                res.status(201).json({
                    title: "good",
                    message: 'login successful',
                    token: token,
                    userId: fb_user._id
                });
            })
        }).pipe(stream);
    });
});

module.exports = router;