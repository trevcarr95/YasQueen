const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const showController = require('./controllers/showController');

const PORT = 3000;
const app = express();

// const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/unit11test' : 'mongodb://localhost/unit11dev';
// mongoose.connect(mongoURI);


const MONGO_URI = 'mongodb+srv://trevcarr:Guinness7545@cluster0.y8iu9.mongodb.net/drag?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'drag'
})
.then(()=>console.log('Connected to Mongo DB.'))
.catch(err=>console.log(err));


app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(__dirname + '/client'));

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'

app.post('/api/submit', showController.addShow, (req, res) => {
  if (res.locals.alreadyExists) {
    return res.status(200).json(res.locals.existingShow);
  }
  else return res.status(200).json('show added successfully');
})


app.post('/api/search', showController.getShow, (req, res) => {
  return res.json(res.locals.shows);
})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
});
  
app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });
  
module.exports = app;

