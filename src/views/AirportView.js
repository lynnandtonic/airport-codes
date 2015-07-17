var Backbone = require('backbone');

var AirportView = Backbone.View.extend({

  initialize: function() {
    this.$el = Backbone.$('#code-'+this.model.get('code'));
    this.el = this.$el[0];
    this.model.on('change:visible', this._setClassName, this);
    this.imageUrl = this._getImageUrl().replace(/(^url|["()])/ig, '');
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
    return this;
  }

});

module.exports = AirportView;
