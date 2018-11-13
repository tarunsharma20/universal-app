const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const movieSchema = new mongoose.Schema({
  status: {
    type: String,
    trim: true,
    required: true
  },
  release_date: {
    type: Number
  },
  directors: [{
    type: String,
    required: true,
    trim: true
  }],
  screen_writers: [{
    type: String,
    require: true,
    trim: true
  }],
  producers: [{
    type: String,
    require: true,
    trim: true
  }],
  budget: {
    type: Number,
  },
  earning: {
    type: Number,
  },
  length: {
    type: String,
    trim: true
  },
  story: {
    type: String,
    trim: true
  },
  cast_members_ids: [{
    type: Schema.ObjectId,
    ref: 'CastMember'
  }],
  image: {
    type: String,
    trim: true
  },
  created_at: {
    type: Number,
    required: true
  },
  updated_at: {
    type: Number,
    required: true
  }
});

movieSchema.pre('validate', function (next) {
  const currentDate = Date.now();
  this.updated_at = currentDate;

  // if created_at doesn't exist, then add it
  if(!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

module.exports = mongoose.model('Movie', movieSchema);
