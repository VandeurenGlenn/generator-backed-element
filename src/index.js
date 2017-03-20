'use strict';
import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import utils from 'backed-utils';
import path from 'path';

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This method adds support for a `--coffee` flag
    this.option('default');
    this.argument('name', {required: false});
  }

  initializing() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the great ' + chalk.red('generator-backed-element') + ' generator!'
    ));
  }

  configuring() {
    this.composeWith(require.resolve('./../element'), {
      default: this.options.default,
      name: this.options.name
    });
  }

  end() {
    this.log(yosay(
      'Done, Thanks for using ' + chalk.red('generator-backed-element') + ' generator!'
    ));
  }
}
