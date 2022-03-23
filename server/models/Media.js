const { Schema } = require('mongoose');
const reviewSchema = require('./Review');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const mediaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: false,
  },
  // saved movie id from imdb
  imdbID: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  link: {
    type: String,
  },
  reviews: [reviewSchema]
});



module.exports = mediaSchema;