var express = require('express');
var routes = express.Router();

routes.get('/', function(req, res) {
  res.render('index', {title: "Home"});
});


// routes.get('/*', function(req, res) {
//   res.render('index', {title: "home"});
// });


module.exports = routes;