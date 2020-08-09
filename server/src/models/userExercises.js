const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    owner: {
        type: String,
        required: false
    },
    exercises:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Exercises'
    }]
});

module.exports = mongoose.model('userExercises', schema);