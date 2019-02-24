var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Doctor = require('./models/doctor');
Queue = require('./models/queue');

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
    var id = req.params._id;
    Doctor.getDoctorById(id, function(err, doctor){
        if(err){
            throw err;
        }
        res.json({doctor: doctor});
    });
});

app.get('/api/queue/doctor/:doctor', function(req, res){
    var doctor = req.params.doctor;
    Queue.getQueuesByDoctor(doctor, function(err, queues){
        if(err){
            throw err;
        }
        res.json({queues: queues});
    });
});

app.get('/api/queue/user/:email', function(req, res){
    var user = req.params.email;
    Queue.getQueueByUser(user, function(err, queue){
        if(err){
            throw err;
        }
        res.json({queue: queue});
    });
});

app.get('/api/queue/:_id', function(req,res){
    var id = req.params._id;
    Queue.getQueuesById(id, function(err, queue){
        if(err){
            throw err;
        }
        res.json({queue: queue});
    })
});


app.get('/api/queue', function(req,res){
    Queue.getQueues(function(err, queues){
        if(err){
            throw err;
        }
        res.json({queues: queues});
    })
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

app.post('/api/queue/done', function(req, res){
    var id = req.body._id;
    var done = req.body.done;
    console.log(req.body);
    console.log(done);
    Queue.updateQueue(id, done, function(err, queue){
        if(err){
            throw err;
        }
        res.json(queue);
    })
});

app.listen(process.env.PORT || 3000);
console.log('Running on port 3000');