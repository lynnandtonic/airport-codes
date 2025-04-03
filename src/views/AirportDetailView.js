var Backbone = require('backbone');

var template = require('./templates/AirportDetailView.jade');

var AirportDetailView = Backbone.View.extend({

  tagName: 'div',
  className: 'detail',

  events: {
    'click a.random': '_handleRandom'
  },

  initialize: function(options) {
    this.airports = options.airports;
    this.model.on('change:showDetail', this.toggle, this);
  },

  viewModel: function() {
    return {
      id: this.model.get('id'),
      name: this.model.get('name'),
      city: this.model.get('city'),
      state: this.model.get('state'),
      stateShort: this.model.get('stateShort'),
      country: this.model.get('country'),
      description: this.model.get('description'),
      imageCredit: this.model.get('imageCredit'),
      imageCreditLink: this.model.get('imageCreditLink')
    };
  },

  show: function() {
    var self = this;
    process.nextTick(function() {
      self.model.set('showDetail', true);
    });
  },

  hide: function() {
    this.model.set('showDetail', false);
  },

  toggle: function() {
    this.$el.toggleClass('hidden', !this.model.get('showDetail'));
  },

  _handleRandom: function(event) {
    event.preventDefault();
    var len = this.airports.length;
    window.location.href = '#airport/' + this.airports.at(Math.floor(Math.random()*len)).get('id');
  },

  _setClassName: function() {
    this.$el.addClass(this.model.get('id'));
  },

  render: function() {
    this._setClassName();
    this.$el.html(template(this.viewModel()));

    Backbone.$('body').append(this.$el);
    this.$('.close-detail').focus();
    return this;
  },

});

module.exports = AirportDetailView;
