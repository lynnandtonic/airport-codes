var Backbone = require('backbone');
var template = require('./templates/SearchView.jade');

var SEARCH_FIELD = [
  'code', 'name', 'nameEnglish', 'city', 'city2', 'city3', 'state', 'stateShort', 'country'
];

var SearchView = Backbone.View.extend({

  tagName: 'header',

  events: {
    'keyup input': '_handleKey'
  },

  initialize: function(options) {
    this.airports = options.airports;
  },

  _handleKey: function(event) {
    var $el = this.$(event.target);
    this._search($el.val());
  },

  _search: function(value) {
    var searchTerm = new RegExp('^'+value, 'gi');

    this.airports.each(function(model) {
      var hasMatch = false;

      // Search each field
      for(var i=0;i<SEARCH_FIELD.length;i++) {
        var key = SEARCH_FIELD[i];

        // Validate we match
        if(searchTerm.test(model.get(key))) {
          hasMatch = true;
          break;
        }
      }

      model.set('visible', hasMatch);

    });
  },

  render: function() {
    this.$el.html(template());
    return this;
  }

});

module.exports = SearchView;