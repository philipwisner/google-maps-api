var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RestaurantSchema   = new Schema({
  name: String,
  description: String,
  location: {
  	type: {type: String},
  	coordinates: [Number]
  }

});

RestaurantSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Restaurant', RestaurantSchema);