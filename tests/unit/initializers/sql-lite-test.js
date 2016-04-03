import Ember from 'ember';
import SqlLiteInitializer from '../../../initializers/sql-lite';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | sql lite', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  SqlLiteInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
