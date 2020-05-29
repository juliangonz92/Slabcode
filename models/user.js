//Load modules
const mongoose = require('mongoose');

//Use schema
let Schema = mongoose.Schema;

let userSchema = new Schema({    
    email: { type: String},
    password: { type: String},    
},{versionKey: false});

module.exports = mongoose.model('User', userSchema);