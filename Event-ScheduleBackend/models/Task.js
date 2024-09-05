const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    subject: {
         type: String, required: true
         },
    startTime: { 
        type: Date, required: true
     },
    endTime: {
         type: Date, required: true 
        },
    description: {
         type: String 
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;
