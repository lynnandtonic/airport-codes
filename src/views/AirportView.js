var Backbone = require('backbone');
var template = require('./templates/AirportView.jade');

var AirportView = Backbone.View.extend({

  tagName: 'li',
  className: 'card',

  initialize: function() {
    this.model.on('change:visible', this._setClassName, this);
    this.imageUrl = this._getImageUrl().replace(/(url|["()])/ig, '');
  },

  viewModel: function() {
    return {
      code: this.model.get('code'),
      name: this.model.get('name'),
      city: this.model.get('city'),
      state: this.model.get('state'),
      country: this.model.get('country'),
      description: this.model.get('description'),
      imageCredit: this.model.get('imageCredit'),
      imageCreditLink: this.model.get('imageCreditLink')
    };
  },

  _setClassName: function() {
    this.$el.addClass(this.model.get('code'));
    this.$el.toggleClass('loaded', this.loaded);
    this.$el.toggleClass('hidden', !this.model.get('visible'));
  },

  _getImageUrl: function() {
    var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
    for( var i=0;i<classes.length;i++ ) {
      if (classes[i].selectorText === '.card.'+this.model.get('id')+' .background') {
        return classes[i].style.backgroundImage;
      }
    }

    return '';
  },

  lazyLoad: function() {
    var img = new Image();
    img.src = this.imageUrl;

    var self = this;
    img.onload = function() {
      self.loading = false;
      self.loaded = true;
      self._setClassName();
    };

    this.loading = true;

    img = null;
  },

  render: function() {
    this.$el.html(template(this.viewModel()));
    return this;
  }

});

module.exports = AirportView;