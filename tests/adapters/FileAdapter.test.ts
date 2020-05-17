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

    it('store strings', async () => {
        expect(await storage.get('x')).toBeNull();
        await storage.set('x', 'y');
        expect(await storage.get('x')).toEqual('y');
    });

    it('store objects', async () => {
        await storage.set('x', { a: 'b' });
        expect(await storage.get('x')).toEqual({ a: 'b' });
    });

    it('remove items', async () => {
        await storage.set('x', 'y');
        expect(await storage.get('x')).toEqual('y');
        await storage.remove('x');
        expect(await storage.get('x')).toBeNull();
    });

    it('do not remove existing db file', async () => {
        await storage.set('x', 'y');
        const storage2 = new Storage('', new ADAPTERS.FileAdapter(dbFile));
        expect(await storage2.get('x')).toEqual('y');
    });
});
