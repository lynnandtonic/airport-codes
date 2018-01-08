var Backbone = require('backbone');
var AboutView = require('./views/AboutView');
var ContributeView = require('./views/ContributeView');
var AirportDetailView = require('./views/AirportDetailView');

var Router = Backbone.Router.extend({

  views: [],

  initialize: function(options) {
    this.airports = options.airports;
    this._lastOffset = 0;
  },

  routes: {
    "about":           "about",
    "contribute":      "contribute",
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

  _hideContribute: function() {
    if (this._contributeView) {
      this._contributeView.hide();
    }
  },

  _resetOffset: function() {
    Backbone.$(window).scrollTop(this._lastOffset);
  },

  _trackView: function(page, title) {
    if (window.ga) {
      ga('send', 'pageview', {
        'page': page,
        'title': title
      });
    }
  },

  default: function() {
    this._hideAbout();
    this._hideContribute();
    this._hideAirports();
    this._resetOffset();

    Backbone.$('body').removeClass('detail-open');
  },

  about: function() {
    if (!this._aboutView) {
      this._aboutView = new AboutView({airports: this.airports});
      Backbone.$('body').append(this._aboutView.render().el);
    }

    this._aboutView.show();
    this._hideContribute();
    this._hideAirports();
    this._lastOffset = (window.scrollY === undefined) ? window.pageYOffset : window.scrollY;

    Backbone.$('body').addClass('detail-open');
    this._trackView('#about', 'About');
  },

  contribute: function() {
    if (!this._contributeView) {
      this._contributeView = new ContributeView();
      Backbone.$('body').append(this._contributeView.render().el);
    }

    this._contributeView.show();
    this._hideAirports();
    this._hideAbout();
    this._lastOffset = (window.scrollY === undefined) ? window.pageYOffset : window.scrollY;

    Backbone.$('body').addClass('detail-open');
    this._trackView('#contribute', 'Contribute');
  },

  airport: function(code) {
    var airport = this.airports.get(code);

    this._hideAbout();
    this._hideContribute();
    this._hideAirports();
    this._lastOffset = (window.scrollY === undefined) ? window.pageYOffset : window.scrollY;

    if (airport) {
      if (this.views.indexOf(code) < 0) {
        var view = new AirportDetailView({airports: this.airports, model: airport});
        view.render();
        this.views.push(code);
      }

      airport.set('showDetail', true);
      Backbone.$('body').addClass('detail-open');
      this._trackView('#airport/'+code, 'Airport '+code.toUpperCase());
    } else {
      document.location.href = "/404.html";
    }
  }

});

module.exports = Router;
