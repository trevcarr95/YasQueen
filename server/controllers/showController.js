const Show = require('../models/showModel');


const showController = {};

showController.addShow = (req, res, next) => {
    console.log('showController.addShow)', req.body);
    // const {
    //     performer,
    //     venue,
    //     address,
    //     date,
    //     time,
    //     cover
    // } = req.body;

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

module.exports = showController;