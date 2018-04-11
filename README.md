# Storage Keeper

[![npm version](https://badge.fury.io/js/storage-keeper.svg)](https://badge.fury.io/js/storage-keeper)
[![renovate-app](https://img.shields.io/badge/renovate-app-blue.svg)](https://renovateapp.com/) 
[![Known Vulnerabilities](https://snyk.io/test/github/fabulator/storage-keeper/badge.svg)](https://snyk.io/test/github/fabulator/storage-keeper)
[![codecov](https://codecov.io/gh/fabulator/storage-keeper/branch/master/graph/badge.svg)](https://codecov.io/gh/fabulator/storage-keeper) 
[![travis](https://travis-ci.org/fabulator/storage-keeper.svg?branch=master)](https://travis-ci.org/fabulator/storage-keeper)


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
