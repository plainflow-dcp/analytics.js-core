'use strict';

var analytics = require('../lib');
var assert = require('proclaim');

describe('analytics', function() {
  it('should expose a .VERSION', function() {
    var pkg = require('../package.json');
    assert.equal(analytics.VERSION, pkg.version);
  });

  describe('noConflict', function() {
    var previousAnalyticsGlobal;

    beforeEach(function() {
      // Defined in test/support/global.js
      previousAnalyticsGlobal = window.plainflow;
      assert(previousAnalyticsGlobal, 'test harness expected global.plainflow to be defined but it is not');
    });

    afterEach(function() {
      previousAnalyticsGlobal = undefined;
    });

    // TODO(ndhoule): this test and support/global.js are a little ghetto; we
    // should refactor this to run in a separate test suite
    it('should restore global.plainflow to its previous value', function() {
      assert(global.plainflow === previousAnalyticsGlobal);

      var analytics = require('../lib');
      global.plainflow = analytics;

      assert(global.plainflow === analytics);

      var noConflictAnalytics = global.plainflow.noConflict();

      assert(global.plainflow === previousAnalyticsGlobal);
      assert(noConflictAnalytics === analytics);
    });
  });
});
