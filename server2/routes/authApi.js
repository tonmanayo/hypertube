var express = require('express');
var router = express.Router();

router.get('/facebook', function (req, res, next) {
    res.redirect("https://www.facebook.com/v2.8/dialog/oauth?client_id=1846290908954876"
        + "&response_type=token&display=popup"
        + "&redirect_uri=http://localhost:3000/fbAuth"
        + "&scope=public_profile,email");
});

/*router.get('/42', function (req, res, next) {
    res.redirect("https://api.intra.42.fr/oauth/authorize?" +
        "client_id=90d06caee047f6775b468dec7125fa69157d696210c27ee11e5bd53c130fc2ce&" +
        "redirect_uri=http://localhost:3000/wtcAuth&response_type=code" +
        "&client_secret=8e17dbebf770789e1134ea010d7239fdf0c960a24bec36d4092a8b57bc92be72&" +
        "grant_type=client_credentials");
});*/

module.exports = router;