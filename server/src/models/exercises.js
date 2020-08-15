const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    muscleType: {
        type: String,
        required: false
    },
    image: {
        link: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    public: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Exercises', schema);