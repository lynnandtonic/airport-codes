var Backbone = require('backbone');
var AboutView = require('./views/AboutView');
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

  _hideAbout: function() {
    if (this._aboutView) {
      this._aboutView.hide();
    }
  },

  default: function() {
    this._hideAbout();
    this._hideAirports();
    Backbone.$('body').removeClass('detail-open');
  },

  about: function() {
    if (!this._aboutView) {
      this._aboutView = new AboutView();
      Backbone.$('body').append(this._aboutView.render().el);
    }

    this._aboutView.show();

    this._hideAirports();
    Backbone.$('body').addClass('detail-open');
  },

  airport: function(code) {
    var airport = this.airports.get(code);

    this._hideAbout();
    this._hideAirports();

    if (airport) {
      if (this.views.indexOf(code) < 0) {
        var view = new AirportDetailView({model: airport});
        view.render();
        this.views.push(code);
      }

      airport.set('showDetail', true);
      Backbone.$('body').addClass('detail-open');
    }
  }

});

module.exports = Router;