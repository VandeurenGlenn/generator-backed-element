'use strict';
import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import utils from 'backed-utils';
import path from 'path';
import os from 'os';
const platform = os.platform();

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This method adds support for a `--coffee` flag
    this.option('default');
    this.argument('name', {type: 'string', required: false});
  }

  prompting() {
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

    if (this.options.default) return;
    else return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      if (this.options.name) {
        props.name = this.options.name;
      }
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
    const moduleName = utils.toJsProp(this.props.name);

    this.fs.copy(
      this.templatePath('.*'),
      this.destinationPath('./')
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
        name: this.props.name,
        moduleName: moduleName,
        format: this.props.format || 'es'
      }
    );

    this.fs.copyTpl(
      this.templatePath('backed-element.js'),
      this.destinationPath(`src/${this.props.name}.js`),
      {
        className: moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
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
      this.destinationPath('demo/index.html'),
      {
        name: this.props.name
      }
    );
  }

  install() {
    try {
      console.log(chalk.yellow('backed version'))
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
}
