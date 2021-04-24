const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
    name: String,
    image: String,
    title: String,
    quote: String,
    questionOne: String,
    questionTwo: String,
    questionThree: String,
    questionFour: String,
    questionFive: String,
    questionSix: String
});

module.exports = mongoose.model('Profile', ProfileSchema);