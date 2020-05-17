# Storage Keeper

[![npm version](https://badge.fury.io/js/storage-keeper.svg)](https://badge.fury.io/js/storage-keeper)
[![renovate-app](https://img.shields.io/badge/renovate-app-blue.svg)](https://renovateapp.com/)
[![Known Vulnerabilities](https://snyk.io/test/github/fabulator/storage-keeper/badge.svg)](https://snyk.io/test/github/fabulator/storage-keeper)
[![codecov](https://codecov.io/gh/fabulator/storage-keeper/branch/master/graph/badge.svg)](https://codecov.io/gh/fabulator/storage-keeper)
[![travis](https://travis-ci.org/fabulator/storage-keeper.svg?branch=master)](https://travis-ci.org/fabulator/storage-keeper)

This library provide simple way how to interact with storages that are based on browser (localstorage, sessionstorage, cookie) or node (fs). It provides same interface for handling all of them.

Storage have only three async methods:

- Get key
- Set key (optionally set expiration date)
- Delete key

Values can be strings, numbers or objects. Object will be saved as JSON in storage.

## How to use it

Install the library:

```nodedaemon
npm install storage-keeper --save
```

Now you can use native browser storages: .

```javascript
import { LocalStorage } from 'storage-keeper';

const storage = new LocalStorage('prefix');

await storage.set('userId', 6);
await storage.set('user', 'paprika');
await storage.set('user', { name: 'paprika' });

// add expiration date
await storage.set('signed', true, new Date('2018-05-01'));

console.log(await storage.get('signed'));

await storage.remove('signed');
```

### How to use adapters

You can use adapters for fs and cookies:

```javascript
import { Storage } from 'storage-keeper';
import CookieAdapter  from 'storage-keeper/dist/adapters/CookieAdapter';

const storage = new Storage('prefix', new CookieAdapter());

await storage.set('some-value', 'x');
```

For storing values in file on node:

```javascript
import { Storage } from 'storage-keeper';
import FileAdapter  from 'storage-keeper/dist/adapters/FileAdapter';

const storage = new Storage('prefix', new FileAdapter('path-to-file'));

await storage.set('some-value', 'x');
```

You can create your own adapter, just use following interface:

```javascript
interface Adapter {
    getItem(key: string): Promise<string | null> | string | null,
    setItem(key: string, data: string): Promise<void> | void,
    removeItem(key: string): Promise<void> | void,
}
```
