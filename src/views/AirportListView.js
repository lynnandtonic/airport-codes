var Backbone = require('backbone');
var AirportView = require('./AirportView');
var ContributeItemView = require('./ContributeItemView');

var AirportListView = Backbone.View.extend({

  tagName: 'ul',
  className: 'cf airport-list',

  initialize: function(options) {
    this.airports = options.airports;
    this.render();

    var self = this;
    Backbone.$(window).scroll(function() {
      self._updateViews(arguments);
    });

    Backbone.$(window).resize(function() {
      self._updateViews(arguments);
    });
  },

  _updateViews: function(event) {
    var scrollY = window.scrollY;
    var height = window.innerHeight;

    for(var i=0;i<this._views.length;i++) {
      var view = this._views[i];

      if (scrollY+height+300 >= view.$el.offset().top && !view.loaded) {
        view.lazyLoad();
      }
    }
  },

  render: function() {
    var views = this.renderAirports();
    this.$el.html('');
    this.$el.append(views);

    var contributeItemView = new ContributeItemView();
    this.$el.append(contributeItemView.render().el);

    var self = this;
    process.nextTick(function(){
      self._updateViews();
    });

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