# babel-plugin-pegjs-inline-precompile

[![Build Status](https://travis-ci.org/ming-codes/babel-plugin-pegjs-inline-precompile.svg?branch=master)](https://travis-ci.org/ming-codes/babel-plugin-pegjs-inline-precompile)
[![Greenkeeper badge](https://badges.greenkeeper.io/ming-codes/babel-plugin-pegjs-inline-precompile.svg)](https://greenkeeper.io/)

> Babel plugin for inline precompile of pegjs expression


## Install

```
$ npm install babel-plugin-pegjs-inline-precompile
```


## Usage

.babelrc

```js
{
  "plugins": ["babel-plugin-pegjs-inline-precompile"]
}
```

```js
import peg from 'pegjs-inline-precompile';

export default {
  expression: peg`
    Value = .+
  `,
};
```

## License

MIT © [ming-codes](https://ming-codes.github.io)
