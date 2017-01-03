var express = require('express');
var router = express.Router();
var request = require('request');

function extraInfo(body) {
    return {
        id: body.id,
        title: body.original_title,
        rating: body.vote_average,
        runtime: body.runtime,
        year: body.release_date.split('-')[0],
        language: body.spoken_languages[0].name,
        image: "http://image.tmdb.org/t/p/" + "w500" + body.poster_path,
        overview: body.overview,
        type: 'movie',
        genre: body.genres[0].name
    }
}

function extraInfo2(body) {
    return {
        id: body.id,
        title: body.name,
        rating: body.vote_average,
        runtime: body.runtime,
        language: body.original_language,
        image: "http://image.tmdb.org/t/p/" + "w500" + body.poster_path,
        overview: body.overview,
        type: 'series',
        genre: body.genres[0].name,
        first: body.first_air_date,
        year: body.first_air_date.split('-')[0],
        last: body.last_air_date,
        seasons: body.number_of_seasons,
        episodes: body.number_of_episodes
    }
}

router.get('/movie', function (req, res, next) {
    url = "https://api.themoviedb.org/3/movie/"+req.query.id+"?" +
        "api_key=88fb971d6edf2b3de88914b0157a7cca&language=en-US";
    request(url, function (err, response, body) {
        if (err || response.statusCode != 200){
            return res.status(500).json({
                title: "An error occurred",
                err: err,
                error: {message: 'internal server error'}
            });
        }
        var newBody = JSON.parse(body);
        var details = extraInfo(newBody);
        var genres = newBody.genres;
        res.status(201).json({
            title: 'success',
            details: details,
            genres: genres
        })
    });
});

router.get('/series', function (req, res, next) {
    url = "https://api.themoviedb.org/3/tv/"+req.query.id+"?api_key=88fb971d6edf2b3de88914b0157a7cca&language=en-US";
    request(url, function (err, response, body) {
        if (err || response.statusCode != 200){
            return res.status(500).json({
                title: "An error occurred",
                err: err,
                error: {message: 'internal server error'}
            });
        }
        var newBody = JSON.parse(body);
        var details = extraInfo2(newBody);
        var genres = newBody.genres;
        res.status(201).json({
            title: 'success',
            details: details,
            genres: genres
        })
    });
});

module.exports = router;