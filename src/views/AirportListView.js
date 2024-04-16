var Backbone = require('backbone');
var AirportView = require('./AirportView');
var ContributeItemView = require('./ContributeItemView');

var AirportListView = Backbone.View.extend({

  tagName: 'ul',
  className: 'cf airport-list',

  _deferTimer: null,

  initialize: function(options) {
    this.airports = options.airports;
    this.render();

    this.airports.on('change:visible', this._handleChange, this);

    var self = this;
    Backbone.$(window).scroll(function() {
      self._updateViews(arguments);
    });

    Backbone.$(window).resize(function() {
      self._updateViews(arguments);
    });
  },

  // Defer our changes so we only update the views once
  _deferChange: function() {
    if (this._deferTimer) {
      clearTimeout(this._deferTimer);
    }

    var self = this;
    this._deferTimer = setTimeout(function() {
      self._updateViews();
    }, 2);
  },

  _handleChange: function() {
    this._deferChange();
  },

  _checkLazyload: function(view) {
    var scrollY = (window.scrollY === undefined) ? window.pageYOffset : window.scrollY;
    var height = window.innerHeight;
    var top = view.$el.offset().top;

    function comingInView() {
      return (scrollY + height + 500 >= top && top >= scrollY - height + 500);
    }

    if (view.isVisible() && !view.loading && !view.loaded && comingInView()) {
      view.lazyLoad();
    }
  },

  _updateViews: function(event) {
    for(var i=0;i<this._views.length;i++) {
      this._checkLazyload(this._views[i]);
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
