const Show = require('../models/showModel');
const fetch = require("node-fetch");

const showController = {};

showController.addShow = (req, res, next) => {
    const geoAddress = (addressString) => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+addressString+'&key=AIzaSyB2-tJwgbWFOaCav59-Z8vZ4Poi80Fcz6g')
            .then(response => response.json())
            .then(data => {
                // console.log(data.results[0].geometry.location);
                let latitude = data.results[0].geometry.location.lat;
                let longitude = data.results[0].geometry.location.lng;
                Show.create({
                    performer: req.body.performer,
                    venue: req.body.venue,
                    address: req.body.address, 
                    date: req.body.date,
                    time: req.body.time, 
                    cover: req.body.cover,
                    latitude: latitude,
                    longitude: longitude,
                })
                .then(result => {
                    return next();
                 })
            .catch(err => {
                console.log('catch statement')
                return next(err);
            })  
        })
    }

    Show.find({performer : `${req.body.performer}`, date: `${req.body.date}`, time: `${req.body.time}`}).exec()
    .then(result => {
        if (!result.length) {
            geoAddress(req.body.address);


        //     Show.create({
        //         performer: req.body.performer,
        //         venue: req.body.venue,
        //         address: req.body.address, 
        //         date: req.body.date,
        //         time: req.body.time, 
        //         cover: req.body.cover
        //     })
        //     .then(result => {
        //         return next();
        //      })
        // .catch(err => {
        //     console.log('catch statement')
        //     return next(err);
        // })  
    }
        else {
            res.locals.alreadyExists = true;
            res.locals.existingShow = result;
            console.log('this event exists already', result);
            return next()
        }
    })
}

showController.getShow = (req, res, next) => {
    
    //if only searching by city, no other requirements
    if (!req.body.value) {
        // console.log(req.body.city);
        if (req.body.city === 'New York/Brooklyn') {
            Show.find({address : {$regex: 'NY'}}).exec()
            .then(shows => {
            res.locals.shows = shows;
            return next();
        })
        }

        else if (req.body.city === 'Los Angeles') {
            Show.find({address : {$regex: 'CA'}}).exec()
            .then(shows => {
            res.locals.shows = shows;
            return next();
        })
        }

        else {
            Show.find({address : {$regex: `${req.body.city}`}}).exec()
        .then(shows => {
            res.locals.shows = shows;
            return next();
        })
    }

    }

    //searching for specific performer
    if (req.body.value && req.body.criteria === 'performer') {

        if (req.body.city === 'New York/Brooklyn') {
            Show.find({address : {$regex: `NY`}, performer: {$regex: `${req.body.value}`}}).exec()
        .then (shows => {
            res.locals.shows = shows;
            return next();
        })
        }

        else Show.find({address : {$regex: `${req.body.city}`}, performer: {$regex: `${req.body.value}`}}).exec()
        .then (shows => {
            res.locals.shows = shows;
            return next();
        })
    }

    //searching for specific venue
    if (req.body.value && req.body.criteria === 'venue') {
        if (req.body.city === 'New York/Brooklyn') {
            Show.find({address : {$regex: `NY`}, venue: {$regex: `${req.body.value}`}}).exec()
            .then (shows => {
            res.locals.shows = shows;
            return next();
        })

        }
        else Show.find({address : {$regex: `${req.body.city}`}, venue: {$regex: `${req.body.value}`}}).exec()
        .then (shows => {
            res.locals.shows = shows;
            return next();
        })
    }

    //searching for specific date
    if (req.body.value && req.body.criteria === 'date') {
        const dateOfShow = new Date(`${req.body.value}`).toString();
        console.log(dateOfShow);

        if (req.body.city === 'New York/Brooklyn') {
            Show.find({address : {$regex: `NY`}, date: `${dateOfShow}`}).exec()
            .then (shows => {
            res.locals.shows = shows;
            return next();
        })


        }
        else Show.find({address : {$regex: `${req.body.city}`}, date: `${dateOfShow}`}).exec()
        .then (shows => {
            res.locals.shows = shows;
            return next();
        })
    }

    //searching for specific cost 
    if (req.body.value && req.body.criteria === 'cost') {
        if (req.body.city === 'New York/Brooklyn') {
            Show.find({address : {$regex: `NY`}, cover: {$lte: `${req.body.value}`}}).exec()
            .then(shows => {
            res.locals.shows = shows;
            return next();
        })

        }
        else Show.find({address : {$regex: `${req.body.city}`}, cover: {$lte: `${req.body.value}`}}).exec()
        .then(shows => {
            res.locals.shows = shows;
            return next();
        })
    }
}

module.exports = showController;