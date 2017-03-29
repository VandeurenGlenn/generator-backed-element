# generator-backed-element [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> The official Backed element generator

## Installation

First, install [Yeoman](http://yeoman.io) and generator-backed-element using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-backed-element
```

## Generate your new project:

```bash
yo backed-element
```

## API
### Options backed-element[options]
#### default
Type: `boolean`<br>
Default: `false`<br>
Options: `true`

When true, skips prompting

```bash
yo backed-element --default
```

#### name
Type: `string`<br>
Default: `cwd`<br>

You can pass a name so you won't be prompted

```bash
yo backed-element some-element
```


## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

 © [Glenn Vandeuren]()


[npm-image]: https://badge.fury.io/js/generator-backed-element.svg
[npm-url]: https://npmjs.org/package/generator-backed-element
[travis-image]: https://travis-ci.org/VandeurenGlenn/generator-backed-element.svg?branch=master
[travis-url]: https://travis-ci.org/VandeurenGlenn/generator-backed-element
[daviddm-image]: https://david-dm.org/VandeurenGlenn/generator-backed-element.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/VandeurenGlenn/generator-backed-element
[coveralls-image]: https://coveralls.io/repos/VandeurenGlenn/generator-backed-element/badge.svg
[coveralls-url]: https://coveralls.io/r/VandeurenGlenn/generator-backed-element
