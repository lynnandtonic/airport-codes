var Backbone = require('backbone');
var template = require('./templates/AboutView.jade');

var AboutView = Backbone.View.extend({

  show: function() {
    this.$el.removeClass('hidden');
  },

  hide: function() {
    this.$el.addClass('hidden');
  },

  render: function() {
    this.$el.html(template());
    return this;
  }

});

module.exports = AboutView;