# Storage Keeper

[![codecov](https://img.shields.io/npm/v/storage-keeper.svg)](https://www.npmjs.com/package/storage-keeper) [![codecov](https://codecov.io/gh/fabulator/storage-keeper/branch/master/graph/badge.svg)](https://codecov.io/gh/fabulator/storage-keeper)  [![codecov](https://travis-ci.org/fabulator/storage-keeper.svg?branch=master)](https://travis-ci.org/fabulator/storage-keeper) [![Maintainability](https://api.codeclimate.com/v1/badges/7ab35417954388460660/maintainability)](https://codeclimate.com/github/fabulator/storage-keeper/maintainability)


This library provide simple way how to interact with different browser (localstorage, sessionstorage, cookie) and node (fs) storages with same interface.

Storage have only three simple methods:

- Get key
- Set key (optionally set expiration date)
- Delete key

Values can be strings, numbers or objects. Content will be saved as JSON.

## How to use it

Install the library:

```nodedaemon
npm install storage-keeper --save
```

Use it as you with.

```javascript
import { LocalStorage } from 'storage-keeper';

const storage = new LocalStorage('prefix');

storage.set('userId', 6);
storage.set('user', 'paprika');
storage.set('user', { name: 'paprika' });

// add expiration date
storage.set('signed', true, new Date('2018-05-01'));

console.log(storage.get('signed'));

storage.remove('signed');
```

### How to use adapters

You can use adapters when you create Storage object:

```javascript
import { Storage } from 'storage-keeper';
import CookieAdapter  from 'storage-keeper/dist/adapters/CookieAdapter';

const storage = new Storage('prefix', new CookieAdapter());

storage.set('some-value', 'x');
```

Or you can use node fs adapter and store values in file.

```javascript
import { Storage } from 'storage-keeper';
import FileAdapter  from 'storage-keeper/dist/adapters/FileAdapter';

const storage = new Storage('prefix', new FileAdapter('path-to-file'));

storage.set('some-value', 'x');
```
