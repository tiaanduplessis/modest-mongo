
<h1 align="center">modest-mongo</h1>
<div align="center">
  <strong>Modest MongoDB API wrapper</strong>
</div>
<div align="center">
  <a href="https://npmjs.org/package/modest-mongo">
    <img src="https://img.shields.io/npm/v/modest-mongo.svg?style=flat-square" alt="npm package version" />
  </a>
  <a href="https://npmjs.org/package/modest-mongo">
  <img src="https://img.shields.io/npm/dm/modest-mongo.svg?style=flat-square" alt="npm downloads" />
  </a>
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="standard JS linter" />
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square" alt="prettier code formatting" />
  </a>
  <a href="https://travis-ci.org/tiaanduplessis/modest-mongo">
    <img src="https://img.shields.io/travis/tiaanduplessis/modest-mongo.svg?style=flat-square" alt="travis ci build status" />
  </a>
  <a href="https://github.com/tiaanduplessis/modest-mongo/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/modest-mongo.svg?style=flat-square" alt="project license" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="make a pull request" />
  </a>
</div>
<br>
<div align="center">
  <a href="https://github.com/tiaanduplessis/modest-mongo/watchers">
    <img src="https://img.shields.io/github/watchers/tiaanduplessis/modest-mongo.svg?style=social" alt="Github Watch Badge" />
  </a>
  <a href="https://github.com/tiaanduplessis/modest-mongo/stargazers">
    <img src="https://img.shields.io/github/stars/tiaanduplessis/modest-mongo.svg?style=social" alt="Github Star Badge" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20modest-mongo!%20https://github.com/tiaanduplessis/modest-mongo%20%F0%9F%91%8D">
    <img src="https://img.shields.io/twitter/url/https/github.com/tiaanduplessis/modest-mongo.svg?style=social" alt="Tweet" />
  </a>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="https://github.com/tiaanduplessis">tiaanduplessis</a> and <a href="https://github.com/tiaanduplessis/modest-mongo/contributors">contributors</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## Install

[![Greenkeeper badge](https://badges.greenkeeper.io/tiaanduplessis/modest-mongo.svg)](https://greenkeeper.io/)

```sh
$ npm install modest-mongo
# OR
$ yarn add modest-mongo
```
## Usage

After requiring `modest-mongo`, create a new client instance:

```js
const Client = require('modest-mongo')

// Create new new client instance
const mongoClient = new Client({ db: 'example' })
```

`Client` accepts an `object` or url `string` possible object properties are:

- **`host`** (optional, defaults to `127.0.0.1`)
- **`port`** (optional, default to `27017`)
- **`db`** (required)

After a client is created, you can create a new collection:

```js
const dudes = mongoClient.collection('dudes')

// Some example data

const dude = { name: 'Tiaan', surname: 'du Plessis' }
const otherDude = { name: 'Evan', surname: 'du Plessis' }
const anotherDude = { name: 'Paul', surname: 'du Plessis' }
```

The collection instance returned then allows you to `find`, `save`, `count`, `update` and `remove` documents in the collection. For example


```js
// Save
dudes
  .save(dude)
  .then(res => {
    console.log(res)
    const id = res[0]._id.toString()
    dudes.find(id).then(console.log).catch(console.log)
    dudes.update(id, { surname: 'Du Plessis' }).then(console.log).catch(console.log)
  })
  .catch(console.log)
dudes.save([otherDude, anotherDude]).then(console.log).catch(console.log)

// Find
dudes.find({ name: 'Tiaan' }).then(console.log).catch(console.log)

dudes.find(
  {},
  {
    limit: 2,
    skip: 1,
    fields: ['name']
  }
)

// Count
dudes.count().then(console.log).catch(console.log)

// Update
dudes.update({ name: 'Paul' }, { surname: 'Du Plessis' }).then(console.log).catch(console.log)

// Remove
dudes.remove({ name: 'Evan' }).then(console.log).catch(console.log)
// dudes.remove().then(console.log).catch(console.log)

```

## Contributing

Contributions are welcome!

1. Fork it.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Or open up [a issue](https://github.com/tiaanduplessis/modest-mongo/issues).

## License

Licensed under the MIT License.
