window.require.register("index", function(require, module) {(function() {
  require('Router');
  moduleLibrary.define('router', new (moduleLibrary.get('Router')));
  return Backbone.history.start();
})();
});
