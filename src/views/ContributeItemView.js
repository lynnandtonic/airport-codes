var Backbone = require('backbone');
var template = require('./templates/ContributeItemView.jade');

var ContributeItemView = Backbone.View.extend({

  tagName: 'li',
  className: 'card card-contribute',

  render: function() {
    this.$el.html(template());
    return this;
  }

});

module.exports = ContributeItemView;