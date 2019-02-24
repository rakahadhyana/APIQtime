var mongoose = require('mongoose');

//Queue Schema
var queueSchema = mongoose.Schema({
    user:{
        type: String,
        require: true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    take_time:{
        type: Date,
        default: Date.now
    },
    done:{
        type: Boolean,
        default: false
    }
})

var Queue = module.exports = mongoose.model('Queue', queueSchema);

module.exports.getQueues = function(callback, limit){
    Queue.find(callback).limit(limit);
}

module.exports.getQueuesById = function(id, callback){
    Queue.findById(id, callback);
}

module.exports.getQueuesByDoctor = function(doctor, callback){
    Queue.find({ doctor: doctor}, callback);
}

module.exports.getQueueByUser = function(user, callback){
    Queue.findOne({user: user}, callback);
}

module.exports.addQueue = function(queue, callback){
    Queue.create(queue, callback);
}

module.exports.updateQueue = function(queue,done,callback){
    Queue.update({_id: queue}, {done: done},callback);
}