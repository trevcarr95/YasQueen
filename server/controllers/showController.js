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
    console.log('showController.findShow', req.body);
    const regexText = req.body.city;
    // Show.find( {address: {$in : [req.body.city]}} )
    // Show.find({"address" : /.*son.*/i});

    if (!req.body.value) {
        Show.find({address : {$regex: `${req.body.city}`}}).exec()
        .then(shows => {
            console.log(shows);
        })
    }
    return next();
}

module.exports = showController;