var Backbone = require('backbone');
var jquery = require('jquery');
var data = require('../data');

Backbone.$ = jquery;

var Airports = require('./collections/Airports');
var AppView = require('./views/AppView');

var Application = function() {

  this.airports = new Airports(data.airports);

  this.appView = new AppView({
    airports: this.airports
  });

  this.appView.render();
};

jquery(function() {
  var application = new Application();
});
