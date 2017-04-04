//since we don't have a database we'll use our front end models at the moment
//libraries
var films = require('../client/src/models/films')();
var Film = require('../client/src/models/film');
var Review = require('../client/src/models/review');

//include express, the web server module (from npm install)
var express = require('express');
// set up new request router, which looks at requests + understand which function they go to
var filmRouter = express.Router();

 // include body parser module from npm 
var bodyParser = require('body-parser');
//tell router to use json parser on requests
filmRouter.use(bodyParser.json());
//router to expect URL encoding also
filmRouter.use(bodyParser.urlencoded({extended: true}));

// if receive GET request for root path on website (/), return (in json) contents of the object films
filmRouter.get('/', function(req, res) {
  res.json(films);
});

filmRouter.get('/:id', function(req, res) {
  // return json data w/ info for film id searched for
  res.json({data: films[req.params.id]});
});

// if put request for certain film id
filmRouter.put('/:id', function(req, res) {
  // make new film object, get title + actors from inside HTTP request (in json format)
  var film = new Film({
    title: req.body.title,
    actors: req.body.actors
  });

  //update existing id in the data store w/  new film
  films[req.params.id] = film;
  //return json encoded new film details
  res.json({data: films});
});

//if get POST request to root path (/), adding new film to system
filmRouter.post('/', function(req, res){
  var newFilm = {
    title: req.body.title,
    actors: req.body.actors
  }

  // create a new film object
  var options = new Film(newFilm);
  //push it to end offilm list
  films.push(options);
  res.json({data: films});
});

// if receive DELETE request for a certain id
filmRouter.delete('/:id', function(req, res) {
  //delete 1 item from array, starting at index from id we're given
  films.splice(req.params.id, 1);
  res.json({data: films});
});

module.exports = filmRouter;