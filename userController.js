'use strict'
var mongoose = require('mongoose'); 
var Player = require('./models/playerModel'); 
var path =require('path');
var fs = require('fs'); 

// Commented out to connect to Heroku MongoDB
// mongoose.connect('mongodb://localhost/db'); 

var uristring = 
  process.env.MONGODB_URI || process.env.MONGOLAB_URI ||
  'mongodb://localhost/db';

// The http server will listen to an appropriate port, or default to
// port 5000.
// var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});




var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error')); 
db.once('open', function(){
    console.log('Successfully connected to DB via mongoose...');
}); 

var userController = {}; 

userController.addPlayer = function(req,res){
  //Using bodyparser in server.js, we collect details from user request, add to database with Player schema, then refresh page to show new data
  var newPlayer = {}; 
  newPlayer.name = req.body.name; 
  newPlayer.ppg = req.body.ppg; 
  newPlayer.rpg = req.body.rpg; 
  newPlayer.apg = req.body.apg;
  newPlayer.pic = req.body.pic;  
  Player.create(newPlayer, function(err, user){
    if (err) throw err;  
  res.send(user);  
  });
  // res.redirect('./views/SixersFunStats.html');  

}; 
   
userController.sendData = function(req, res){
  //Data collected from MongoDB, sent to funStats.js
  Player.find({}, function(err, players){
    // console.log('players in DB:', players);    
    res.send(players); 
 });
}; 


userController.updateData = function(req, res){
  //search DB for player name entered by user using Player schema, update data in DB based on user input, refresh page to show updated data
  var query = { 'name': req.body.name};
  var options = {multi: true};  
  var update={};
  update[req.body.stat]=req.body.newStat;
  Player.findOneAndUpdate(
    query,
    {$set:update},
    {new: true},
    function (err,success) {
      if(err) throw err;
      else res.send(success);
  }); 
  
}; 

userController.deletePlayer = function(req, res){
  //search DB for player name entered by user using Player schema, delete player in DB, refresh page to show updated data
  var toDelete = { 'name': req.body.delName};
  Player.findOneAndRemove(toDelete, function(err, success) {
    if (err) throw err; 
    else{
    res.send(success);
    }    
    });
}; 


module.exports = userController; 

