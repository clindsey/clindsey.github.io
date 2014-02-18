moduleLibrary.define('Router', Backbone.Router.extend({
  routes: {
    ':projectName': 'showProjectRoute',
    '*index': 'indexRoute'
  },
  indexRoute: function() {},
  showProjectRoute: function(projectName) {}
}));
