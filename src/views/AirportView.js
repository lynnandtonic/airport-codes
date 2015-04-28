var Backbone = require('backbone');
var template = require('./templates/AirportView.jade');

var AirportView = Backbone.View.extend({

  tagName: 'li',
  className: 'card',

  initialize: function() {
    this.model.on('change:visible', this._setClassName, this);
    this.imageUrl = this._getImageUrl().replace(/(^url|["()])/ig, '');
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

  isVisible: function() {
    return this.model.get('visible');
  },

  _setClassName: function() {
    this.$el.addClass(this.model.get('code'));
    this.$el.toggleClass('loaded', this.loaded);
    this.$el.toggleClass('hidden', !this.model.get('visible'));
  },

  _getImageUrl: function() {
    for( var j=0;j<document.styleSheets.length;j++ ) {
      var classes = document.styleSheets[j].rules || document.styleSheets[j].cssRules;
      for( var i=0;i<classes.length;i++ ) {
        if (classes[i].selectorText === '.card.'+this.model.get('id')+' .background' ||
            classes[i].selectorText === '.'+this.model.get('id')+'.card .background') {
          return classes[i].style.backgroundImage;
        }
      }
    }

    return '';
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
