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
    // public: {
    //     type: Boolean,
    //     required: false
    // }
});

module.exports = mongoose.model('Workouts', schema);