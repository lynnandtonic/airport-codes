var Backbone = require('backbone');
var AirportDetailView = require('./AirportDetailView');
var template = require('./templates/AirportView.jade');

var AirportView = Backbone.View.extend({

  tagName: 'li',
  className: 'card',

  events: {
    'click a': '_handleClick'
  },

  initialize: function() {
    this.model.on('change', this.render, this);
  },

  viewModel: function() {
    return {
      id: this.model.get('id'),
      code: this.model.get('code'),
      name: this.model.get('name'),
      city: this.model.get('city'),
      state: this.model.get('state'),
      country: this.model.get('country'),
      description: this.model.get('description'),
      thumbnail: this.model.get('thumbnail'),
      fullImage: this.model.get('fullImage'),
      imageCredit: this.model.get('imageCredit'),
      imageCreditLink: this.model.get('imageCreditLink')
    };
  },

  hideDetail: function() {
    if(this._detailView) {
      this._detailView.hide();
    }
  },

  _handleClick: function(event) {
    event.preventDefault();

    if(!this._detailView) {
      this._detailView = new AirportDetailView({model: this.model});
      this._detailView.render();
    }

    this._detailView.show();
  },

  _setClassName: function() {
    this.$el.addClass(this.model.get('code'));
    this.$el.toggleClass('hidden', !this.model.get('visible'));
  },

  render: function() {
    this._setClassName();
    this.$el.html(template(this.viewModel()));
    return this;
  }

});

module.exports = AirportView;