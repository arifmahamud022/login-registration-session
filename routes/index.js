var express = require('express');
var router = express.Router();

const { regauth } = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/allbody', function(req, res, next) {
  res.render('allbosy', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' , errors: ''});
});
router.get('/oneflashing',regauth, function(req, res, next) {
  res.render('oneflashing', { title: 'login' , user: req.user});
});

router.get('/flashing', function(req, res, next) {
  res.render('flashing', { title: 'login' });
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'register', errors: '' });
});

router.get('/register2', function(req, res, next) {
  res.render('register2', { title: 'register', errors: '' });
});

router.get('/login2', function(req, res, next) {
  res.render('login2', { title: 'register', errors: '' });
});



module.exports = router;
