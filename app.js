var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Doctor = require('./models/doctor');

mongoose.connect('mongodb://localhost/qtime');
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Please use /api/doctors or /api/queues');
});

app.get('/api/doctors', function(req, res){
    Doctor.getDoctors(function(err, doctors){
        if(err){
            throw err;
        }
        res.json({doctors: doctors});
    });
})

app.get('/api/doctors/:_id', function(req, res){
    Doctor.getDoctorById(req.params._id, function(err, doctor){
        if(err){
            throw err;
        }
        res.json({doctor: doctor});
    });
})

app.listen(process.env.PORT || 3000);
console.log('Running on port 3000');