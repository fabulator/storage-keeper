import 'jest-localstorage-mock';
import { Storage, SessionStorage, LocalStorage } from '../src';

describe('Test storage class', () => {
    const storage = new Storage('prefix-');

    it('should store item in storage', () => {
        storage.set('a', 'b');
        expect(storage.get('a')).toEqual('b');
        expect(localStorage.getItem('prefix-a')).toEqual('b');
    });

    it('should handle store without prefix', () => {
        const storageWithouPrefix = new Storage();
        storageWithouPrefix.set('a', 'b');
        expect(storageWithouPrefix.get('a')).toEqual('b');
        expect(localStorage.getItem('a')).toEqual('b');
    });

    it('should delete item from storage', () => {
        storage.set('a', 'b');
        storage.remove('a');
        expect(storage.get('a')).toEqual(null);
    });

    it('should return null if item is not know', () => {
        expect(storage.get('unknown')).toEqual(null);
    });

    it('should parse JSON objects', () => {
        storage.set('a', { a: 'b' });
        expect(storage.get('a')).toEqual({ a: 'b' });
    });

    it('should not return expired objects', () => {
        const date = new Date();
        date.setTime(1);
        storage.set('a', { a: 'b' }, date);
        expect(storage.get('a')).toEqual(null);
    });

    it('should return not expired objects', () => {
        const date = new Date(Date.now() + 1000000000);
        storage.set('b', { a: 'xxxxxxxx' }, date);
        expect(storage.get('b')).toEqual({ a: 'xxxxxxxx' });

        storage.set('c', 'string value', date);
        expect(storage.get('c')).toEqual('string value');
    });

    it('can set number variable', () => {
        storage.set('a', 1);
        expect(storage.get('a')).toEqual(1);
    });

    it('can create LocalStorage and SessionStorage instance', () => {
        const local = new LocalStorage();
        local.set('s', 666);
        expect(localStorage.getItem('s')).toEqual('666');

        const session = new SessionStorage();
        session.set('s', 666);
        expect(sessionStorage.getItem('s')).toEqual('666');
    });
});
