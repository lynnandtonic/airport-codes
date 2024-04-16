var Backbone = require('backbone');
var template = require('./templates/AirportView.jade');

var AirportView = Backbone.View.extend({

  tagName: 'li',
  className: 'card',

  initialize: function() {
    this.model.on('change:visible', this._setClassName, this);
    this.imageUrl = 'images/card/' + this.model.id + '.jpg';
  },

  viewModel: function() {
    return {
      id: this.model.get('id'),
      name: this.model.get('name'),
      city: this.model.get('city'),
      state: this.model.get('state'),
      country: this.model.get('country'),
      description: this.model.get('description'),
      imageCredit: this.model.get('imageCredit'),
      imageCreditLink: this.model.get('imageCreditLink')
    };
  },

  isVisible: function() {
    return this.model.get('visible');
  },

  _setClassName: function() {
    this.$el.addClass(this.model.get('id'));
    this.$el.toggleClass('loaded', this.loaded);
    this.$el.toggleClass('hidden', !this.model.get('visible'));
  },

  lazyLoad: function() {
    var img = new Image();
    img.src = this.imageUrl;

    var self = this;

    var handleLoad = function() {
      clearTimeout(loadTimeout);
      img.onload = null;

      self.loading = false;
      self.loaded = true;
      self._setClassName();

      img = null;
    };

    img.onload = handleLoad;
    var loadTimeout = setTimeout(handleLoad, 10000);

    this.loading = true;
  },

  render: function() {
    this.$el.html(template(this.viewModel()));
    return this;
  }

});

module.exports = AirportView;
