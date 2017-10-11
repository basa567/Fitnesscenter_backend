 var mongoose = require('mongoose');

var ReserveCategory = mongoose.model('reserveCategory', {
  category: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  resource: {
    type: String,
    default: null
  },
  reservedAt: {
    type: Number
  },
  start: {
    type: Number
  },
  end: {
    type: Number
  }
});


module.exports = {
  ReserveCategory
};
