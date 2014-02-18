window.require.register('test/integration/collections/privacyCategory', function(require, module) {
var PrivacyCategoryCollection;

require('collections/PrivacyCategory');

PrivacyCategoryCollection = moduleLibrary.get('PrivacyCategory.Collection');

describe('Collection PrivacyCategory', function() {
  return beforeEach(function() {
    return this.privacyCategoryCollection = new PrivacyCategoryCollection;
  });
});

});

window.require.register('test/integration/initialize', function(require, module) {
var runner, test, tests, _i, _len;

tests = ['test/integration/router', 'test/integration/views/mainViewer', 'test/integration/collections/privacyCategory', 'test/integration/models/privacyCategory', 'test/integration/views/privacyCategory', 'test/integration/views/privacyCategoryList', 'test/integration/views/detailViewer'];

for (_i = 0, _len = tests.length; _i < _len; _i++) {
  test = tests[_i];
  require(test);
}

if (window.mochaPhantomJS) {
  mochaPhantomJS.run();
} else {
  runner = mocha.run();
  runner.on('end', function() {
    return new MochaCov;
  });
}

});

window.require.register('test/integration/models/privacyCategory', function(require, module) {
var PrivacyCategoryModel;

require('models/PrivacyCategory');

PrivacyCategoryModel = moduleLibrary.get('PrivacyCategory.Model');

describe('Model PrivacyCategory', function() {
  return beforeEach(function() {
    return this.privacyCategoryModel = new PrivacyCategoryModel;
  });
});

});

window.require.register('test/integration/router', function(require, module) {
var Router;

require('Router');

Router = moduleLibrary.get('Router');

describe('Router', function() {
  beforeEach(function() {
    return this.router = new Router;
  });
  return it('works', function() {
    return expect(true).to.equal(true);
  });
});

});

window.require.register('test/integration/views/detailViewer', function(require, module) {
var DetailViewerView;

require('views/DetailViewer');

DetailViewerView = moduleLibrary.get('DetailViewer.View');

describe('View DetailViewer', function() {
  return beforeEach(function() {
    return this.detailViewerView = new DetailViewerView;
  });
});

});

window.require.register('test/integration/views/mainViewer', function(require, module) {
var MainViewerView;

require('views/MainViewer');

MainViewerView = moduleLibrary.get('MainViewer.View');

describe('View MainViewer', function() {
  return beforeEach(function() {
    return this.mainViewerView = new MainViewerView;
  });
});

});

window.require.register('test/integration/views/privacyCategory', function(require, module) {
var PrivacyCategoryView;

require('views/PrivacyCategory');

PrivacyCategoryView = moduleLibrary.get('PrivacyCategory.View');

describe('View PrivacyCategory', function() {
  return beforeEach(function() {
    return this.privacyCategoryView = new PrivacyCategoryView;
  });
});

});

window.require.register('test/integration/views/privacyCategoryList', function(require, module) {
var PrivacyCategoryListView;

require('views/PrivacyCategoryList');

PrivacyCategoryListView = moduleLibrary.get('PrivacyCategoryList.View');

describe('View PrivacyCategoryList', function() {
  return beforeEach(function() {
    return this.privacyCategoryListView = new PrivacyCategoryListView;
  });
});

});
