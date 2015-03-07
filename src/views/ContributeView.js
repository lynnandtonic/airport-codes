var Backbone = require('backbone');
var template = require('./templates/ContributeView.jade');

var ContributeView = Backbone.View.extend({

  tagName: 'div',
  className: 'contribute site-info',

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

module.exports = ContributeView;