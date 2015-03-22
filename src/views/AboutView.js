var Backbone = require('backbone');
var _ = require('underscore');
var template = require('./templates/AboutView.jade');

var AboutView = Backbone.View.extend({

  tagName: 'div',
  className: 'about site-info',

  initialize: function(options) {
    this.airports = options.airports;
    this._generateStats();
  },

  _generateStats: function() {
    this._airportCount = this.airports.length;
    console.log(_.unique(this.airports.pluck('country')));
    this._countryCount = _.unique(this.airports.pluck('country')).length;
  },

  viewModel: function() {
    return {
      airportCount: this._airportCount,
      countryCount: this._countryCount
    };
  },

  show: function() {
    this.$el.removeClass('hidden');
  },

  hide: function() {
    this.$el.addClass('hidden');
  },

  render: function() {
    this.$el.html(template(this.viewModel()));
    return this;
  }

});

module.exports = AboutView;