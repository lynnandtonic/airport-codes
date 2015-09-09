var Backbone = require('backbone');
var SocialView = require('./SocialView');

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

    this._renderSocialViews();

    Backbone.$('body').append(this.$el);
    return this;
  },

  _renderSocialViews: function() {
    if (!this._twitter) {
      this._twitter = new SocialView({
        url: 'https://twitter.com/intent/tweet?url=$SHARE_URL&text=$TEXT',
        type: 'twitter',
        text: 'Making sense of those three-letter airport codes. ' + this.model.get('id').toUpperCase() + ':',
        share_url: 'http://airportcod.es/%23airport/' + this.model.get('id')
      });
      this._twitter.render();
    }

    if (!this._facebook) {
      this._facebook = new SocialView({
        url: 'https://www.facebook.com/sharer/sharer.php?u=$SHARE_URL',
        type: 'facebook',
        share_url: 'http://airportcod.es/#airport/' + this.model.get('id')
      });
      this._facebook.render();
    }

    this.$('.detail-info').append([this._twitter.el, this._facebook.el]);
  }

});

module.exports = AirportDetailView;