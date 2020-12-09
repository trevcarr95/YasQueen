const Show = require('../models/showModel');

const showController = {};

showController.addShow = (req, res, next) => {
    // console.log('showController.addShow)', req.body);
    Show.create({
        performer: req.body.performer,
        venue: req.body.venue,
        address: req.body.address, 
        date: req.body.date,
        time: req.body.time, 
        cover: req.body.cover
    })
    .then(result => {
        return next();
    })
    .catch(err => {
        console.log('catch statement')
        return next(err);
    })
}

showController.getShow = (req, res, next) => {
    // console.log('showController.findShow', req.body);

    //if only searching by city, no other requirements
    if (!req.body.value) {
        Show.find({address : {$regex: `${req.body.city}`}}).exec()
        .then(shows => {
            console.log('city only');
            res.locals.shows = shows;
            return next();
        })
    }

    //searching for specific performer
    if (req.body.value && req.body.criteria === 'performer') {
        Show.find({address : {$regex: `${req.body.city}`}, performer: {$regex: `${req.body.value}`}}).exec()
        .then (shows => {
            console.log('performer');
            res.locals.shows = shows;
            return next();
        })
    }

    //searching for specific venue
    if (req.body.value && req.body.criteria === 'venue') {
        Show.find({address : {$regex: `${req.body.city}`}, venue: {$regex: `${req.body.value}`}}).exec()
        .then (shows => {
            console.log('venue');
            res.locals.shows = shows;
            return next();
        })
    }

    //searching for specific date
    if (req.body.value && req.body.criteria === 'date') {
        Show.find({address : {$regex: `${req.body.city}`}, date: `${req.body.value}`}).exec()
        .then (shows => {
            console.log('date');
            res.locals.shows = shows;
            return next();
        })
    }

    //searching for specific cost 
    if (req.body.value && req.body.criteria === 'cost') {
        Show.find({address : {$regex: `${req.body.city}`}, cover: {$lte: `${req.body.value}`}}).exec()
        .then(shows => {
            console.log('cost');
            res.locals.shows = shows;
            return next();
        })
    }
}

module.exports = showController;