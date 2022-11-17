const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var session = require('express-session')

mongoose.connect('mongodb://127.0.0.1:27017/expressdb');
var db = mongoose.connection;


var UserSchema = mongoose.Schema({
    email: {
        type: String,
        index: true,
        
    },

    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },


});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
};

// module.exports.getUserByUsername = function(username,callback){
//     var query ={username: username};
//     User.findOne(query, callback);
// }

module.exports.getUserByEmail = function(username,callback){
    var query ={email: email};
    User.findOne(query, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        callback(null, isMatch);
    });
}

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


