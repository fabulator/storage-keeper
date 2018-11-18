import * as Cookie from 'js-cookie';
import CookieAdapter from '../../src/adapters/CookieAdapter';

jest.mock('js-cookie');

describe('Test CookieAdapter', () => {
    it('communicate with Cookie service', () => {
        const adapter = new CookieAdapter();
        adapter.setItem('a', '1');
        adapter.getItem('a');
        adapter.removeItem('a');

        expect(Cookie.set).toHaveBeenCalledWith('a', '1', {});
        expect(Cookie.remove).toHaveBeenCalledWith('a', {});
        expect(Cookie.get).toHaveBeenCalledWith('a');
    });

    it('set expire date based on value', () => {
        const adapter = new CookieAdapter({
            expires: 1,
        });

        const now = Date.now();

        const valueToSet = JSON.stringify({
            expire: now,
            value: 'some-value',
        });

        adapter.setItem('some-key', valueToSet);

        const expire = new Date();
        expire.setTime(now);

        expect(Cookie.set).toHaveBeenCalledWith('some-key', valueToSet, {
            expires: expire,
        });
    });

    it('appends options to set and remove methods', () => {
        const adapter = new CookieAdapter({
            path: 'some-path',
        });
        adapter.setItem('a', '1');
        adapter.removeItem('a');
        expect(Cookie.set).toHaveBeenCalledWith('a', '1', {
            path: 'some-path',
        });
        expect(Cookie.remove).toHaveBeenCalledWith('a', {
            path: 'some-path',
        });
    });
});
