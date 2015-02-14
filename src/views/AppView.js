var Backbone = require('backbone');
var AirportView = require('./AirportView');

var AppView = Backbone.View.extend({

  el: 'body',

  initialize: function(options) {
    this.airports = options.airports;

    this.airports.on('change', this.render, this);
  },

  render: function() {
    var views = this.renderAirports();
    this.$el.append(views);
  },

  renderAirports: function() {
    var views = [];

    this.airports.each(function(model) {
      var view = new AirportView({model: model});
      views.push(view.render().el);
    });

    return views;
  }

});

module.exports = AppView;