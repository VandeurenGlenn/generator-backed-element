'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Generator = _interopDefault(require('yeoman-generator'));
var chalk = _interopDefault(require('chalk'));
var yosay = _interopDefault(require('yosay'));
var utils = _interopDefault(require('backed-utils'));
var path = _interopDefault(require('path'));
var os = _interopDefault(require('os'));

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

var platform = os.platform();
var _class = function (_Generator) {
  inherits(_class, _Generator);
  function _class(args, opts) {
    classCallCheck(this, _class);
    var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, opts));
    _this.option('default');
    _this.argument('name', { type: 'string', required: false });
    return _this;
  }
  createClass(_class, [{
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;
      var prompts = [{
        type: 'input',
        name: 'name',
        message: 'Whats the name for your component?',
        default: process.cwd(),
        when: !this.options.name
      }, {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: '0.0.0'
      }, {
        type: 'input',
        name: 'format',
        message: 'Format to export as, options are [cjs, es, iife, amd]',
        default: 'iife'
      }, {
        type: 'input',
        name: 'description',
        message: 'Description'
      }, {
        type: 'input',
        name: 'homepage',
        message: 'Project homepage url'
      }, {
        type: 'input',
        store: true,
        name: 'authorName',
        message: 'Author\'s Name',
        default: this.user.git.name()
      }, {
        type: 'input',
        store: true,
        name: 'authorEmail',
        message: 'Author\'s Email',
        default: this.user.git.email()
      }, {
        type: 'input',
        store: true,
        name: 'authorUrl',
        message: 'Author\'s Homepage',
        default: ''
      }, {
        type: 'confirm',
        store: true,
        name: 'license',
        message: 'Include license?',
        default: true
      }, {
        type: 'input',
        name: 'keywords',
        message: 'Package keywords (comma to split)'
      }];
      if (this.options.default) return;else return this.prompt(prompts).then(function (props) {
        if (_this2.options.name) {
          props.name = _this2.options.name;
        }
        _this2.props = props;
      });
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      this.composeWith(require.resolve('generator-node/generators/git'), {
        name: this.props.name,
        githubAccount: this.props.authorEmail
      });
      if (this.props.license) {
        this.composeWith(require.resolve('generator-license/app'), {
          name: this.props.authorName,
          email: this.props.authorEmail,
          website: this.props.authorUrl
        });
      }
    }
  }, {
    key: 'writing',
    value: function writing() {
      var moduleName = utils.toJsProp(this.props.name);
      this.fs.copy(this.templatePath('.*'), this.destinationPath('./'));
      this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {
        name: this.props.name,
        version: this.props.version,
        authorName: this.props.authorName,
        authorEmail: this.props.authorEmail,
        authorUrl: this.props.authorUrl
      });
      this.fs.copyTpl(this.templatePath('backed.json'), this.destinationPath('backed.json'), {
        name: this.props.name,
        moduleName: moduleName,
        format: this.props.format || 'es'
      });
      this.fs.copyTpl(this.templatePath('backed-element.js'), this.destinationPath('src/' + this.props.name + '.js'), {
        className: moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
      });
      this.fs.copyTpl(this.templatePath('backed-element.html'), this.destinationPath(this.props.name + '.html'), {
        name: this.props.name
      });
      this.fs.copyTpl(this.templatePath('demo.html'), this.destinationPath('demo/index.html'), {
        name: this.props.name
      });
    }
  }, {
    key: 'install',
    value: function install() {
      try {
        console.log(chalk.yellow('backed version'));
        this.spawnCommandSync('backed', ['version']);
        console.log();
      } catch (e) {
        if (platform === 'win32') {
          this.spawnCommandSync('yarn', ['global', 'add', 'backed-cli']);
        } else {
          this.spawnCommandSync('sudo', ['yarn', 'global', 'add', 'backed-cli']);
        }
      }
      this.log('Swiping things up');
      this.spawnCommand('rm', ['-rf', 'node_modules']);
      this.installDependencies({
        bower: false,
        npm: false,
        yarn: true
      });
    }
  }]);
  return _class;
}(Generator);

module.exports = _class;
//# sourceMappingURL=index.js.map
