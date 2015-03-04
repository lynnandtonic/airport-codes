var Backbone = require('backbone');
var jquery = require('jquery');

var Router = require('./AppRouter');

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
  new Router({airports: this.airports});
  Backbone.history.start();
};

jquery(function() {
  var application = new Application();
});
