window.require.register('test/unit/collections/privacyCategory', function(require, module) {
var PrivacyCategoryCollection;

require('collections/PrivacyCategory');

PrivacyCategoryCollection = moduleLibrary.get('PrivacyCategory.Collection');

describe('Collection PrivacyCategory', function() {
  beforeEach(function() {
    return this.privacyCategoryCollection = new PrivacyCategoryCollection;
  });
  it('has a url', function() {
    return expect(this.privacyCategoryCollection.url).to.not.equal(void 0);
  });
  it('parses correctly', function() {
    var response;
    response = {
      categories: [1, 2, 3],
      other: 'something'
    };
    return expect(this.privacyCategoryCollection.parse(response)).to.deep.equal(response.categories);
  });
  return describe('with items', function() {
    beforeEach(function() {
      return this.privacyCategoryCollectionWhereStub = sinon.stub(this.privacyCategoryCollection, 'where');
    });
    afterEach(function() {
      return this.privacyCategoryCollectionWhereStub.restore();
    });
    it('gets collect items', function() {
      this.privacyCategoryCollection.getCollectItems();
      return expect(this.privacyCategoryCollectionWhereStub.calledWith({
        type: 'collect'
      })).to.equal(true);
    });
    return it('gets share items', function() {
      this.privacyCategoryCollection.getShareItems();
      return expect(this.privacyCategoryCollectionWhereStub.calledWith({
        type: 'share'
      })).to.equal(true);
    });
  });
});

});

window.require.register('test/unit/initialize', function(require, module) {
var runner, test, tests, _i, _len;

tests = ['test/unit/router', 'test/unit/views/mainViewer', 'test/unit/collections/privacyCategory', 'test/unit/models/privacyCategory', 'test/unit/views/privacyCategory', 'test/unit/views/privacyCategoryList', 'test/unit/views/detailViewer'];

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

window.require.register('test/unit/models/privacyCategory', function(require, module) {
var PrivacyCategoryModel;

require('models/PrivacyCategory');

PrivacyCategoryModel = moduleLibrary.get('PrivacyCategory.Model');

describe('Model PrivacyCategory', function() {
  return describe('with determining if active', function() {
    it('works for false case', function() {
      this.privacyCategoryModel = new PrivacyCategoryModel({
        options: []
      });
      return expect(this.privacyCategoryModel.isActive()).to.equal(false);
    });
    return it('works for true case', function() {
      this.privacyCategoryModel = new PrivacyCategoryModel({
        options: [
          {
            'a': 'b'
          }
        ]
      });
      return expect(this.privacyCategoryModel.isActive()).to.equal(true);
    });
  });
});

});

window.require.register('test/unit/router', function(require, module) {
var MainViewerViewStub, Router;

require('Router');

Router = moduleLibrary.get('Router');

describe('Router', function() {
  beforeEach(function() {
    return this.router = new Router;
  });
  return describe('with home route', function() {
    beforeEach(function() {
      this.moduleLibraryGetStub = sinon.stub(moduleLibrary, 'get');
      this.moduleLibraryGetStub.withArgs('MainViewer.View').returns(MainViewerViewStub);
      return this.router.indexRoute();
    });
    afterEach(function() {
      return moduleLibrary.get.restore();
    });
    it('is a valid route', function() {
      return expect(this.router.routes['*index']).to.equal('indexRoute');
    });
    it('creates a main viewer view', function() {
      return expect(MainViewerViewStub.prototype.initialize.called).to.equal(true);
    });
    return it('renders the main viewer view', function() {
      return expect(MainViewerViewStub.prototype.render.called).to.equal(true);
    });
  });
});

MainViewerViewStub = Backbone.View.extend({
  initialize: sinon.stub(),
  render: sinon.stub()
});

});

window.require.register('test/unit/views/detailViewer', function(require, module) {
var DetailViewerView;

require('views/DetailViewer');

DetailViewerView = moduleLibrary.get('DetailViewer.View');

describe('View DetailViewer', function() {
  beforeEach(function() {
    return this.collection = new Backbone.Collection;
  });
  describe('with render', function() {
    beforeEach(function() {
      this.detailViewerView = new DetailViewerView({
        collection: this.collection
      });
      sinon.stub(this.detailViewerView.$el, 'html');
      return this.detailViewerView.render();
    });
    afterEach(function() {
      return this.detailViewerView.$el.html.restore();
    });
    return it('adds template', function() {
      return expect(this.detailViewerView.$el.html.called).to.equal(true);
    });
  });
  describe('with events', function() {
    beforeEach(function() {
      return this.detailViewerView = new DetailViewerView({
        collection: this.collection
      });
    });
    return it('has events', function() {
      return expect(this.detailViewerView.events).to.deep.equal({
        'click .detail-viewer-close': 'onClickClose',
        'click .detail-viewer-help': 'onClickHelp',
        'click .detail-viewer-nav li': 'onClickNav'
      });
    });
  });
  return describe('with triggers', function() {
    beforeEach(function() {
      this.onCategorySelectStub = sinon.stub(DetailViewerView.prototype, 'onCategorySelect');
      this.onCategoryNavSelectStub = sinon.stub(DetailViewerView.prototype, 'onCategoryNavSelect');
      return this.detailViewerView = new DetailViewerView({
        collection: this.collection
      });
    });
    afterEach(function() {
      this.onCategorySelectStub.restore();
      return this.onCategoryNavSelectStub.restore();
    });
    it('listens for category select event', function() {
      Backbone.trigger('!categorySelect', 999);
      return expect(this.onCategorySelectStub.called).to.equal(true);
    });
    return it('listens for category nav select event', function() {
      Backbone.trigger('!categoryNavSelect', 999);
      return expect(this.onCategoryNavSelectStub.called).to.equal(true);
    });
  });
});

});

window.require.register('test/unit/views/mainViewer', function(require, module) {
var DetailViewerViewStub, MainViewerView, PrivacyCategoryCollectionStub, PrivacyCategoryListViewStub;

require('views/MainViewer');

MainViewerView = moduleLibrary.get('MainViewer.View');

describe('View MainViewer', function() {
  beforeEach(function() {
    this.moduleLibraryGetStub = sinon.stub(moduleLibrary, 'get');
    this.moduleLibraryGetStub.withArgs('PrivacyCategory.Collection').returns(PrivacyCategoryCollectionStub);
    this.moduleLibraryGetStub.withArgs('PrivacyCategoryList.View').returns(PrivacyCategoryListViewStub);
    this.moduleLibraryGetStub.withArgs('DetailViewer.View').returns(DetailViewerViewStub);
    sinon.stub(MainViewerView.prototype, 'listenTo');
    return this.mainViewerView = new MainViewerView;
  });
  afterEach(function() {
    moduleLibrary.get.restore();
    return MainViewerView.prototype.listenTo.restore();
  });
  it('creates a collect list', function() {
    return expect(this.mainViewerView.collectListView).to.not.equal(void 0);
  });
  it('creates a share list', function() {
    return expect(this.mainViewerView.shareListView).to.not.equal(void 0);
  });
  it('creates a detail viewer', function() {
    return expect(this.mainViewerView.detailViewerView).to.not.equal(void 0);
  });
  describe('with render', function() {
    beforeEach(function() {
      sinon.stub(this.mainViewerView.$el, 'html');
      return this.mainViewerView.render();
    });
    afterEach(function() {
      return this.mainViewerView.$el.html.restore();
    });
    it('adds template', function() {
      return expect(this.mainViewerView.$el.html.called).to.equal(true);
    });
    it('calls fetch', function() {
      return expect(PrivacyCategoryCollectionStub.prototype.fetch.called).to.equal(true);
    });
    it('appends collect list', function() {
      return expect(this.mainViewerView.collectListView.render.called).to.equal(true);
    });
    it('appends share list', function() {
      return expect(this.mainViewerView.shareListView.render.called).to.equal(true);
    });
    return it('appends detail viewer', function() {
      return expect(this.mainViewerView.detailViewerView.render.called).to.equal(true);
    });
  });
  return describe('with privacy categories collection', function() {
    it('has a collection of privacy categories', function() {
      return expect(PrivacyCategoryCollectionStub.prototype.initialize.called).to.equal(true);
    });
    it('listens to additions', function() {
      return expect(this.mainViewerView.listenTo.calledWith(this.mainViewerView.privacyCategoryCollection, 'add', this.mainViewerView.addOne)).to.equal(true);
    });
    return describe('when adding an item', function() {
      describe('a collect item', function() {
        beforeEach(function() {
          this.privacyCategoryModel = new Backbone.Model({
            type: 'collect'
          });
          return this.mainViewerView.addOne(this.privacyCategoryModel);
        });
        return it('appends the new item', function() {
          return expect(this.mainViewerView.collectListView.addOne.called).to.equal(true);
        });
      });
      return describe('a share item', function() {
        beforeEach(function() {
          this.privacyCategoryModel = new Backbone.Model({
            type: 'share'
          });
          return this.mainViewerView.addOne(this.privacyCategoryModel);
        });
        return it('appends the new item', function() {
          return expect(this.mainViewerView.shareListView.addOne.called).to.equal(true);
        });
      });
    });
  });
});

PrivacyCategoryCollectionStub = Backbone.Collection.extend({
  initialize: sinon.stub(),
  fetch: sinon.stub()
});

PrivacyCategoryListViewStub = Backbone.View.extend({
  initialize: sinon.stub(),
  $el: $('<div>'),
  render: function() {
    return this;
  },
  addOne: sinon.stub()
});

sinon.stub(PrivacyCategoryListViewStub.prototype, 'render', function() {
  return this;
});

DetailViewerViewStub = Backbone.View.extend({
  initialize: sinon.stub(),
  $el: $('<div>'),
  render: function() {
    return this;
  }
});

sinon.stub(DetailViewerViewStub.prototype, 'render', function() {
  return this;
});

});

window.require.register('test/unit/views/privacyCategory', function(require, module) {
var PrivacyCategoryModelStub, PrivacyCategoryView;

require('views/PrivacyCategory');

PrivacyCategoryView = moduleLibrary.get('PrivacyCategory.View');

describe('View PrivacyCategory', function() {
  beforeEach(function() {
    var privacyCategoryModel;
    privacyCategoryModel = new PrivacyCategoryModelStub;
    return this.privacyCategoryView = new PrivacyCategoryView({
      model: privacyCategoryModel,
      cid: 999
    });
  });
  it('gets image url', function() {
    return expect(this.privacyCategoryView.getImageUrl()).to.equal('/images/btn-tile-testing.png');
  });
  describe('with rendering', function() {
    beforeEach(function() {
      return this.privacyCategoryView.render();
    });
    return it('should have a template', function() {
      return expect(this.privacyCategoryView.template).to.not.equal(void 0);
    });
  });
  return describe('with events', function() {
    it('has a click event', function() {
      return expect(this.privacyCategoryView.events).to.deep.equal({
        'click': 'onClick'
      });
    });
    return it('triggers a catergorySelect event', function() {
      var triggered;
      triggered = false;
      Backbone.on('!categorySelect', function() {
        return triggered = true;
      });
      this.privacyCategoryView.onClick();
      return expect(triggered).to.equal(true);
    });
  });
});

PrivacyCategoryModelStub = Backbone.Model.extend({
  defaults: {
    "class": 'testing'
  },
  isActive: function() {
    return true;
  }
});

});

window.require.register('test/unit/views/privacyCategoryList', function(require, module) {
var PrivacyCategoryListView, PrivacyCategoryViewStub;

require('views/PrivacyCategoryList');

PrivacyCategoryListView = moduleLibrary.get('PrivacyCategoryList.View');

describe('View PrivacyCategoryList', function() {
  beforeEach(function() {
    this.moduleLibraryGetStub = sinon.stub(moduleLibrary, 'get');
    this.moduleLibraryGetStub.withArgs('PrivacyCategory.View').returns(PrivacyCategoryViewStub);
    this.privacyCategoryListView = new PrivacyCategoryListView;
    return sinon.stub(this.privacyCategoryListView.$el, 'append');
  });
  return describe('adding an item', function() {
    beforeEach(function() {
      var privacyCategoryModel;
      privacyCategoryModel = new Backbone.Model({
        type: 'share'
      });
      return this.privacyCategoryListView.addOne(privacyCategoryModel);
    });
    return it('adds the element', function() {
      return expect(this.privacyCategoryListView.$el.append.called).to.equal(true);
    });
  });
});

PrivacyCategoryViewStub = Backbone.View.extend({
  initialize: sinon.stub(),
  $el: $('<div>'),
  render: function() {
    return this;
  },
  addOne: sinon.stub()
});

});
