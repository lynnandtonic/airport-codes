var Backbone = require('backbone');
var template = require('./templates/AirportDetailView.jade');

var AirportDetailView = Backbone.View.extend({

  tagName: 'div',
  className: 'detail',

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
      imageCredit: this.model.get('imageCredit')
    };
  },

  show: function() {
    var self = this;
    process.nextTick(function() {
      self.$el.removeClass('hidden');
    });

  },

  hide: function() {
    this.$el.addClass('hidden');
  },

  render: function() {
    this.$el.html(template(this.viewModel()));
    Backbone.$('body').append(this.$el);
    return this;
  }

});

module.exports = AirportDetailView;