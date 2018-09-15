const mongoose = require('mongoose');

//defining the schema for a gif
const gifSchema = new mongoose.Schema({
  source		: String,
  creator 		: String,
  rating        : { type: Number, default: 0}
});

module.exports = mongoose.model('Gif', gifSchema);
