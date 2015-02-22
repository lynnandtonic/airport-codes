var Backbone = require('backbone');
var SearchView = require('./SearchView');
var AirportListView = require('./AirportListView');

var AppView = Backbone.View.extend({

  el: 'body',

  initialize: function(options) {
    this._airports = options.airports;
  },

  render: function() {
    this._searchView = new SearchView({
      airports: this._airports
    });
    this.$el.append(this._searchView.render().el);

    this._airportListView = new AirportListView({
      airports: this._airports
    });
    this.$el.append(this._airportListView.render().el);

    return this;
  }

});

module.exports = AppView;