var Backbone = require('backbone');
var template = require('./templates/AirportView.jade');

var AirportView = Backbone.View.extend({

  initialize: function() {
    this.model.on('change', this.render, this);
  },

  render: function() {
    this.$el.html(template({name: this.model.get('name')}));
    return this;
  }

});

module.exports = AirportView;