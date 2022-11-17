var express = require('express');
var router = express.Router();

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');
var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login2',
    
  }),
  function (req, res) {
    
    res.redirect('/index');
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new localStrategy(function (email, password, done) {
  User.getUserByEmail(email, function (err, user) {
    if (err) throw err;
    if (!user) {
      return done(null, false, { message: 'Unknown User' });
    }
    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid Password' });
      }
    })
  });
}));



router.post('/register',
body('email','Email is required').isEmail(),
body('first_name','First Name is required').notEmpty(),
body('last_name','Last Name is required').notEmpty(),
body('password','Password is min 6').isLength({MIN : 6}),
body('password_2','Password and Confirm Password does not match').custom((value,
  {req}) => (value === req.body.password)),


 function(req, res, next) {
  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var password = req.body.password;
  var password_2 = req.body.password_2;
  console.log(req.body);

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    res.render('register', { title: 'register', errors: errors.errors });
  }
  else{
    var newUser =new User ({
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password,
      role:'user',
    });
    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      console.log(user);
    });
    res.redirect('/oneflashing')





  }
});



module.exports = router;
