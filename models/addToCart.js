var mongoose = require('mongoose');

var addToCart = mongoose.model('addToCart', {
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
  Time: {
    start: Number,
    end: Number
  }
});


module.exports = {
  addToCart
};
