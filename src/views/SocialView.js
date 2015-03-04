var Backbone = require('backbone');
var template = require('./templates/SocialView.jade');

var SocialView = Backbone.View.extend({

  className: 'social',

  events: {
    "click a": "_handleClick"
  },

  initialize: function(options) {
    this.type = options.type;
    this.url = options.url;
    this.options = options;
  },

  _handleClick: function(event) {
    event.preventDefault();
    var url = this.url;

    for(var key in this.options) {
      var rx = new RegExp('\\$'+key.toUpperCase());
      url = url.replace(rx, this.options[key]);
    }

    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
  },

  render: function() {
    this.$el.html(template({
      url: this.url,
      type: this.type
    }));
    return this;
  }

});

module.exports = SocialView;