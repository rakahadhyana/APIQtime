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

module.exports.addQueue = function(queue, callback){
    Queue.create(queue, callback);
}
