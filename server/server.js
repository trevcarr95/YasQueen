const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use('/signup', (req, res) => {
    res.status(200).send('time to signup');
})

app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
});
  
app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });
  
module.exports = app;

