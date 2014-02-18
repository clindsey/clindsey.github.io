(function() {
  require('Router');
  moduleLibrary.define('router', new (moduleLibrary.get('Router')));
  return Backbone.history.start();
})();
