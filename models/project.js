//Load modules
const mongoose = require('mongoose');

//Use schema
let Schema = mongoose.Schema;

let projectSchema = new Schema({    
    name: {type: String},
    description: {type: String},    
    completed: {type: Boolean},
    tasks: [{
        nameTask: {type: String},
        descriptionTask: {type: String},    
        completedTask: {type: Boolean}
    }]
},{versionKey: false});

module.exports = mongoose.model('Project', projectSchema);