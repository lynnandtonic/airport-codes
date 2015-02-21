var Backbone = require('backbone');
var AirportListView = require('./AirportListView');

var AppView = Backbone.View.extend({

  el: 'body',

  initialize: function(options) {
    this._airports = options.airports;
  },

  render: function() {
    this._airportListView = new AirportListView({
      airports: this._airports
    });
    this.$el.append(this._airportListView.render().el);
    return this;
  }

});

module.exports = AppView;