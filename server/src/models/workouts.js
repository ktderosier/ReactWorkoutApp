const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: false
    },
    exercises:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Exercises'
    }],
    ownerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    public: {
        type: Boolean,
        required: false
    },
    bookmark: {
        type: Boolean
    }

});

module.exports = mongoose.model('Workouts', schema);