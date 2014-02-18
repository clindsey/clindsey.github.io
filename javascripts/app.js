window.require.register('Router', function(require, module) {

moduleLibrary.define('Router', Backbone.Router.extend({
  routes: {
    ':projectName': 'showProjectRoute',
    '*index': 'indexRoute'
  },
  indexRoute: function() {},
  showProjectRoute: function(projectName) {}
}));

});

window.require.register('index', function(require, module) {

(function() {
  require('Router');
  moduleLibrary.define('router', new (moduleLibrary.get('Router')));
  return Backbone.history.start();
})();

});
