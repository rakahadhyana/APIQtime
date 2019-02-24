var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Doctor = require('./models/doctor');

mongoose.connect('mongodb://raka:raka24@ds349175.mlab.com:49175/qtime');
var db = mongoose.connection;

app.use(bodyParser.json());

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
});

app.get('/api/doctors/:_id', function(req, res){
    Doctor.getDoctorById(req.params._id, function(err, doctor){
        if(err){
            throw err;
        }
        res.json({doctor: doctor});
    });
});

app.post('/api/queue', function(req, res){
    var queue = req.body;
    Queue.addQueue(queue, function(err, queue){
        if(err){
            throw err;
        }
        res.json(queue);
    });
});

app.listen(process.env.PORT || 3000);
console.log('Running on port 3000');