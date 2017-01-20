var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var userSchema = new Schema({
    username: {type: String, required: true, unique: true}, 
    num: {type: Number, required: true}
    
}); 

module.exports = mongoose.model('User', userSchema); 