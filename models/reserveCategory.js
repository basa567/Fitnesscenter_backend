 var mongoose = require('mongoose');

var ReserveCategory = mongoose.model('reserveCategory', {
  category: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  useremail: {
    type: String,
    default: null
  },
  reservedate: {
    type: Date
  },
  status: {
    type: Number,
    default:0
  },
  time: {
    type: String
  }
});


module.exports = {
  ReserveCategory
};
