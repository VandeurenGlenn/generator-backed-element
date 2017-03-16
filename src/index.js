'use strict';
const {Generator} = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const utils = require('backed-utils');

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This method adds support for a `--coffee` flag
    this.option('default');
  }

  prompting() {
    this.props = {
      name: process.cwd().match(/\\(?:.(?!\\))+$/g)[0].replace(/\\/g, '')
    };
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the great ' + chalk.red('generator-backed-element') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Whats the name for your component?',
      default: this.props.name
    }, {
      type: 'input',
      name: 'version',
      message: 'Version',
      default: '0.0.0'
    }, {
      type: 'input',
      name: 'description',
      message: 'Description',
      when: !this.props.description
    }, {
      type: 'input',
      name: 'homepage',
      message: 'Project homepage url',
      when: !this.props.homepage
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

    if (this.options.default) return;
    else return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  configuring() {
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

  writing() {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      {
        name: this.props.name,
        version: this.version,
        authorName: this.props.authorName,
        authorEmail: this.props.authorEmail,
        authorUrl: this.props.authorUrl
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        version: this.props.version,
        authorName: this.props.authorName,
        authorEmail: this.props.authorEmail,
        authorUrl: this.props.authorUrl
      }
    );

    this.fs.copyTpl(
      this.templatePath('backed.json'),
      this.destinationPath('backed.json'),
      {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('backed-element.js'),
      this.destinationPath(`src/${this.props.name}.js`),
      {
        className: utils.toJsProp(this.props.name)
      }
    );

    this.fs.copyTpl(
      this.templatePath('backed-element.html'),
      this.destinationPath(`${this.props.name}.html`),
      {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('demo.html'),
      this.destinationPath('demo/demo.html'),
      {
        name: this.props.name
      }
    );
  }

  install() {
    this.installDependencies({
      bower: true
    });
    this.spawnCommandSync('yarn', ['global', 'add', 'backed-cli']);
  }

  end() {
    this.log('Swiping things up');
    this.spawnCommand('rm', ['-rf', 'node_modules']);

    this.log(yosay(
      'Done, Thanks for using ' + chalk.red('generator-backed-element') + ' generator!'
    ));
  }
}