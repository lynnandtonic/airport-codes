var Backbone = require('backbone');
var Airport = require('../models/Airport');

var Airports = Backbone.Collection.extend({

  model: Airport,

  comparator: 'id'

});

module.exports = Airports;