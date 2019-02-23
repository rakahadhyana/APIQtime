var mongoose = require('mongoose');

//Doctor Schema
var doctorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    location:{
        type: String
    }
});

var Doctor = module.exports = mongoose.model('Doctor', doctorSchema);

// Get Doctors
module.exports.getDoctors = function(callback, limit){
    Doctor.find(callback).limit(limit);
}

// Get Doctor
module.exports.getDoctorById = function(id, callback){
    Doctor.findById(id, callback);
}