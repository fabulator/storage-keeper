import * as fs from 'fs';
import { Storage, ADAPTERS } from '../../src';

const dbFile = './tests_results/tmp.txt';
let storage: Storage;

describe('Test FileAdapter', () => {
    beforeEach(() => {
        storage = new Storage('', new ADAPTERS.FileAdapter(dbFile));
    });

    afterEach(() => {
        fs.unlinkSync(dbFile);
    });

    it('create db file', () => {
        expect(fs.existsSync(dbFile)).toBeTruthy();
    });

    it('store strings', () => {
        expect(storage.get('x')).toBeNull();
        storage.set('x', 'y');
        expect(storage.get('x')).toEqual('y');
    });

    it('store objects', () => {
        storage.set('x', { a: 'b' });
        expect(storage.get('x')).toEqual({ a: 'b' });
    });

    it('remove items', () => {
        storage.set('x', 'y');
        expect(storage.get('x')).toEqual('y');
        storage.remove('x');
        expect(storage.get('x')).toBeNull();
    });

    it('do not remove existing db file', () => {
        storage.set('x', 'y');
        const storage2 = new Storage('', new ADAPTERS.FileAdapter(dbFile));
        expect(storage2.get('x')).toEqual('y');
    });
});
