var Backbone = require('backbone');
var AirportView = require('./AirportView');

var AirportListView = Backbone.View.extend({

  tagName: 'ul',
  className: 'cf',

  events: {
    'click a': '_handleClick'
  },

  initialize: function(options) {
    this.airports = options.airports;

    this.airports.on('change', this.render, this);
  },

  _handleClick: function(event) {
    for(var i=0;i<this._views.length;i++) {
      this._views[i].hideDetail();
    }
  },

  render: function() {
    var views = this.renderAirports();
    this.$el.html('');
    this.$el.append(views);
    return this;
  },

  renderAirports: function() {
    var views = [];
    this._views = [];
    var self = this;

    this.airports.each(function(model) {
      var view = new AirportView({model: model});
      self._views.push(view);
      views.push(view.render().el);
    });

    return views;
  }

});

module.exports = AirportListView;