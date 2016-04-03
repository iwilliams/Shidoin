"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('shidoin/app', ['exports', 'ember', 'shidoin/resolver', 'ember-load-initializers', 'shidoin/config/environment'], function (exports, _ember, _shidoinResolver, _emberLoadInitializers, _shidoinConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _shidoinConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _shidoinConfigEnvironment['default'].podModulePrefix,
    Resolver: _shidoinResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _shidoinConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('shidoin/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'shidoin/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _shidoinConfigEnvironment) {

  var name = _shidoinConfigEnvironment['default'].APP.name;
  var version = _shidoinConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('shidoin/controllers/application', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        //actions: {
        //notify() {
        //var t = new Date();
        //t.setSeconds(t.getMinutes() + 10);

        //cordova.plugins.notification.local.schedule({
        //id: 1,
        //title: "Notification",
        //text: "Hello!",
        //at: t
        //});
        //}
        //}
    });
});
define('shidoin/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('shidoin/controllers/goal-new', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        newGoal: {
            name: ''
        },

        actions: {
            setName: function setName(e) {
                this.set('newGoal.name', e.target.value);
                console.log(this.get('newGoal.name'));
            }
        },

        disableSave: _ember['default'].computed('newGoal.name', function () {
            console.log(this.get('newGoal.name'));
            return this.get('newGoal.name').length < 1;
        })
    });
});
define('shidoin/controllers/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('shidoin/controllers/intro', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('shidoin/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('shidoin/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'shidoin/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _shidoinConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_shidoinConfigEnvironment['default'].APP.name, _shidoinConfigEnvironment['default'].APP.version)
  };
});
define('shidoin/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('shidoin/initializers/export-application-global', ['exports', 'ember', 'shidoin/config/environment'], function (exports, _ember, _shidoinConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_shidoinConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _shidoinConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_shidoinConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('shidoin/initializers/sql-lite', ['exports', 'shidoin/services/database'], function (exports, _shidoinServicesDatabase) {
    exports.initialize = initialize;

    function initialize(application) {

        application.deferReadiness();

        document.addEventListener('deviceready', function () {
            var db = window.sqlitePlugin.openDatabase({ name: "shidoin.db", location: 2 }, function (db) {

                var database = _shidoinServicesDatabase['default'].create({
                    db: db
                });

                window.database = database;

                // A factory must be registered before it can be injected
                application.register('database:main', database, { instantiate: false });
                application.inject('route', 'database', 'database:main');

                application.advanceReadiness();
            }, function (error) {});
        }, false);
    }

    exports['default'] = {
        name: 'sql-lite',
        initialize: initialize
    };
});
define('shidoin/instance-initializers/in-app-livereload', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;
  var run = _ember['default'].run;

  function initialize(app) {
    var config = app.__container__.lookupFactory('config:environment');
    var env = config.environment;

    if (config.cordova && config.cordova.reloadUrl && (env === 'development' || env === 'test')) {
      (function () {

        var url = config.cordova.reloadUrl;
        if (window.location.href.indexOf('file://') > -1) {
          run.later(function () {
            window.location.replace(url);
          }, 50);
        }
      })();
    }
  }

  ;

  exports['default'] = {
    name: 'cordova:in-app-livereload',
    initialize: initialize
  };
});
/* globals cordova */
define('shidoin/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('shidoin/router', ['exports', 'ember', 'shidoin/config/environment'], function (exports, _ember, _shidoinConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _shidoinConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('goal-new');
    this.route('intro');
  });

  exports['default'] = Router;
});
define('shidoin/routes/application', ['exports', 'ember', 'ember-cordova/mixins/device/splashscreen'], function (exports, _ember, _emberCordovaMixinsDeviceSplashscreen) {
    exports['default'] = _ember['default'].Route.extend(_emberCordovaMixinsDeviceSplashscreen['default'], {
        beforeModel: function beforeModel() {
            var _this = this;

            this.get('splashscreen').show();
            return this.get('database').checkDatabase().then(function (newUser) {
                if (newUser) {
                    _this.transitionTo('intro');
                } else {
                    _this.get('database').getUser().then(function (user) {
                        if (!user) _this.transitionTo('intro');
                    });
                }
            });
        }
    });
});
define('shidoin/routes/goal-new', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        actions: {
            newGoal: function newGoal(goal) {
                var _this = this;

                this.get('database').newGoal(goal).then(function (newGoal) {
                    _this.transitionTo('index');
                });
            }
        }
    });
});
define('shidoin/routes/index', ['exports', 'ember', 'ember-cordova/mixins/device/splashscreen'], function (exports, _ember, _emberCordovaMixinsDeviceSplashscreen) {
    exports['default'] = _ember['default'].Route.extend(_emberCordovaMixinsDeviceSplashscreen['default'], {
        model: function model() {
            return this.get('database').getGoals();
        }
    });
});
define('shidoin/routes/intro', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('shidoin/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('shidoin/services/cordova', ['exports', 'ember-cordova/services/cordova'], function (exports, _emberCordovaServicesCordova) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCordovaServicesCordova['default'];
    }
  });
});
define('shidoin/services/database', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Service.extend({
        /**
         * Get User
         */
        getUser: function getUser() {
            var db = this.get('db');

            return new _ember['default'].RSVP.Promise(function (res, rej) {
                db.executeSql('SELECT * FROM user', [], function (data) {
                    console.log(data);
                    if (data.rows.length > 0) {
                        res(data.rows.item(0));
                    } else {
                        res(false);
                    }
                }, function (error) {
                    console.log(error.message);
                    rej(error);
                });
            });
        },

        /*
         * Get all goals
         */
        getGoals: function getGoals() {
            var db = this.get('db');

            return new _ember['default'].RSVP.Promise(function (res, rej) {
                db.executeSql('SELECT * FROM goal', [], function (data) {
                    var goals = [];
                    for (var i = 0; i < data.rows.length; i++) {
                        goals.pushObject(data.rows.item(i));
                    }
                    res(goals);
                }, function (error) {
                    rej(error);
                });
            });
        },

        /*
         * New Goal
         */
        newGoal: function newGoal(goal) {
            var db = this.get('db');

            return new _ember['default'].RSVP.Promise(function (res, rej) {
                db.executeSql('INSERT INTO goal (name) VALUES (?)', [goal.name], function (data) {
                    db.executeSql('SELECT * FROM goal WHERE goal_id=?', [data.insertId], function (data2) {
                        res(data2.rows.item(0));
                    });
                }, function (error) {
                    rej(error.message);
                });
            });
        },

        /**
         * Make sure the database is all set up and ready to go
         */
        checkDatabase: function checkDatabase() {
            var _this = this;

            var db = this.get('db');
            // See if there is a version table
            return new _ember['default'].RSVP.Promise(function (res, rej) {
                db.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name=?;", ['version'], function (data) {
                    res(data.rows.length);
                }, function (error) {
                    rej(error.message);
                });
            })
            // If version deos exist, check the number for migrations, else set up db
            .then(function (versionExists) {
                console.log(versionExists);
                if (versionExists) {
                    return false;
                } else {
                    console.log('setup db');
                    return _this._setupDatabase();
                }
            });
        },

        /**
         * Set up the database from scratch
         */
        _setupDatabase: function _setupDatabase() {
            var db = this.get('db');

            return new _ember['default'].RSVP.Promise(function (res, rej) {
                console.log('setting up db');
                // Check if goal table exists
                db.sqlBatch(['DROP TABLE IF EXISTS version', 'CREATE TABLE IF NOT EXISTS version (\n                        version TEXT NOT NULL\n                    )', ['INSERT INTO version VALUES (?)', ['1.0.0']], 'DROP TABLE IF EXISTS goal', 'CREATE TABLE IF NOT EXISTS goal (\n                        goal_id INTEGER NOT NULL PRIMARY KEY,\n                        name TEXT NOT NULL\n                    )', 'DROP TABLE IF EXISTS user', 'CREATE TABLE IF NOT EXISTS user (\n                        name TEXT NOT NULL\n                    )'], function (data) {
                    res(true);
                }, function (error) {
                    console.log(error.message);
                    rej(error.message);
                });
            });
        }
    });
});
define('shidoin/services/device/platform', ['exports', 'ember-cordova/services/device/platform'], function (exports, _emberCordovaServicesDevicePlatform) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCordovaServicesDevicePlatform['default'];
    }
  });
});
define('shidoin/services/device/splashscreen', ['exports', 'ember-cordova/services/device/splashscreen'], function (exports, _emberCordovaServicesDeviceSplashscreen) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCordovaServicesDeviceSplashscreen['default'];
    }
  });
});
define("shidoin/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "shidoin/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("指導員");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [2, 0], [2, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("shidoin/templates/goal-new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "shidoin/templates/goal-new.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("input");
        dom.setAttribute(el1, "type", "text");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Save");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(fragment, [4]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createAttrMorph(element0, 'oninput');
        morphs[2] = dom.createAttrMorph(element1, 'disabled');
        morphs[3] = dom.createElementMorph(element1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]], ["attribute", "oninput", ["subexpr", "action", ["setName"], [], ["loc", [null, [2, 27], [2, 47]]]]], ["attribute", "disabled", ["get", "disableSave", ["loc", [null, [3, 48], [3, 59]]]]], ["element", "action", ["newGoal", ["get", "newGoal", ["loc", [null, [3, 27], [3, 34]]]]], [], ["loc", [null, [3, 8], [3, 36]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("shidoin/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 31
            }
          },
          "moduleName": "shidoin/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("New Goal");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "shidoin/templates/index.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(":\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["content", "goal.goal_id", ["loc", [null, [4, 4], [4, 20]]]], ["content", "goal.name", ["loc", [null, [5, 4], [5, 17]]]]],
        locals: ["goal"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "shidoin/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "link-to", ["goal-new"], [], 0, null, ["loc", [null, [1, 0], [1, 43]]]], ["block", "each", [["get", "model", ["loc", [null, [3, 8], [3, 13]]]]], [], 1, null, ["loc", [null, [3, 0], [7, 9]]]], ["content", "outlet", ["loc", [null, [8, 0], [8, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("shidoin/templates/intro", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 24
            }
          },
          "moduleName": "shidoin/templates/intro.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Next");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "shidoin/templates/intro.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Welcome to the dojo! I, Shiodin, will be your personal teacher!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Together we will work to achieve your goals and set you on the path to victory!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("But first my student, I must ask you some questions to better understand your needs...");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]], ["block", "link-to", ["index"], [], 0, null, ["loc", [null, [5, 0], [5, 36]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("shidoin/templates/loading", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "shidoin/templates/loading.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("LOADING...");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('shidoin/config/environment', ['ember'], function(Ember) {
  var prefix = 'shidoin';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */
if (!runningTests) {
  require("shidoin/app")["default"].create({"name":"shidoin","version":"0.0.0+7435e964"});
}
/* jshint ignore:end */
//# sourceMappingURL=shidoin.map