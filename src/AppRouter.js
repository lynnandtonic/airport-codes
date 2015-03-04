var Backbone = require('backbone');
var AirportDetailView = require('./views/AirportDetailView');

var Router = Backbone.Router.extend({

  views: [],

  initialize: function(options) {
    this.airports = options.airports;
  },

  routes: {
    "about":           "about",
    "airport/:code":   "airport",
    "*path":           "default"
  },

  _hideAirports: function() {
    this.airports.each(function(airport) {
      airport.set('showDetail', false);
    });
  },

  default: function() {
    this._hideAirports();
  },

  about: function() {
    console.log('about');
  },

  airport: function(code) {
    var airport = this.airports.get(code);

    this._hideAirports();

    if (airport) {
      if (this.views.indexOf(code) < 0) {
        var view = new AirportDetailView({model: airport});
        view.render();
        this.views.push(code);
      }

      airport.set('showDetail', true);
    }
  }

});

module.exports = Router;