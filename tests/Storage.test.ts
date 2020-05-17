import 'jest-localstorage-mock';
import { Storage, SessionStorage, LocalStorage } from '../src';

describe('Test storage class', () => {
    const storage = new Storage('prefix-');

    it('should store item in storage', async () => {
        await storage.set('a', 'b');
        expect(await storage.get('a')).toEqual('b');
        expect(localStorage.getItem('prefix-a')).toEqual('b');
    });

    it('should handle store without prefix', async () => {
        const storageWithouPrefix = new Storage();
        await storageWithouPrefix.set('a', 'b');
        expect(await storageWithouPrefix.get('a')).toEqual('b');
        expect(localStorage.getItem('a')).toEqual('b');
    });

    it('should delete item from storage', async () => {
        await storage.set('a', 'b');
        await storage.remove('a');
        expect(await storage.get('a')).toEqual(null);
    });

    it('should return null if item is not know', async () => {
        expect(await storage.get('unknown')).toEqual(null);
    });

    it('should parse JSON objects', async () => {
        await storage.set('a', { a: 'b' });
        expect(await storage.get('a')).toEqual({ a: 'b' });
    });

    it('should not return expired objects', async () => {
        const date = new Date();
        date.setTime(1);
        await storage.set('a', { a: 'b' }, date);
        expect(await storage.get('a')).toEqual(null);
    });

    it('should return not expired objects', async () => {
        const date = new Date(Date.now() + 1000000000);
        await storage.set('b', { a: 'xxxxxxxx' }, date);
        expect(await storage.get('b')).toEqual({ a: 'xxxxxxxx' });

        await storage.set('c', 'string value', date);
        expect(await storage.get('c')).toEqual('string value');
    });

    it('can set number variable', async () => {
        await storage.set('a', 1);
        expect(await storage.get('a')).toEqual(1);
    });

    it('can create LocalStorage and SessionStorage instance', async () => {
        const local = new LocalStorage();
        local.set('s', 666);
        expect(localStorage.getItem('s')).toEqual('666');

        const session = new SessionStorage();
        session.set('s', 666);
        expect(sessionStorage.getItem('s')).toEqual('666');
    });
});
