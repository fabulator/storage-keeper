import Cookies from 'js-cookie';
import { CookieAdapter } from './../../src/adapters';

describe('Test CookieAdapter', () => {
    let setSpy;
    let removeSpy;
    let getSpy;

    beforeEach(() => {
        setSpy = jest.spyOn(Cookies, 'set');
        removeSpy = jest.spyOn(Cookies, 'remove');
        getSpy = jest.spyOn(Cookies, 'get');
    });

    it('communicate with Cookie service', () => {
        const adapter = new CookieAdapter();
        adapter.setItem('a', 1);
        adapter.getItem('a');
        adapter.removeItem('a');

        expect(setSpy).toHaveBeenCalledWith('a', 1, {});
        expect(removeSpy).toHaveBeenCalledWith('a', {});
        expect(getSpy).toHaveBeenCalledWith('a');
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

        expect(setSpy).toHaveBeenCalledWith('some-key', valueToSet, {
            expires: expire,
        });
    });

    it('appends options to set and remove methods', () => {
        const adapter = new CookieAdapter({
            path: 'some-path',
        });
        adapter.setItem('a', 1);
        adapter.removeItem('a');
        expect(setSpy).toHaveBeenCalledWith('a', 1, {
            path: 'some-path',
        });
        expect(removeSpy).toHaveBeenCalledWith('a', {
            path: 'some-path',
        });
    });
});
