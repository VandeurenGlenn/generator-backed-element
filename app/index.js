'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Generator = _interopDefault(require('yeoman-generator'));
var chalk = _interopDefault(require('chalk'));
var yosay = _interopDefault(require('yosay'));
var backedUtils = _interopDefault(require('backed-utils'));
var path = _interopDefault(require('path'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var _class = function (_Generator) {
  inherits(_class, _Generator);

  function _class(args, opts) {
    classCallCheck(this, _class);

    // This method adds support for a `--coffee` flag
    var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, opts));

    _this.option('default');
    _this.argument('name', { required: false });
    return _this;
  }

  createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      // Have Yeoman greet the user.
      this.log(yosay('Welcome to the great ' + chalk.red('generator-backed-element') + ' generator!'));
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      this.composeWith(require.resolve('./../element'), {
        default: this.options.default,
        name: this.options.name
      });
    }
  }, {
    key: 'end',
    value: function end() {
      this.log(yosay('Done, Thanks for using ' + chalk.red('generator-backed-element') + ' generator!'));
    }
  }]);
  return _class;
}(Generator);

module.exports = _class;
//# sourceMappingURL=index.js.map
