// @flow
import Cookies, { type CookieOptions } from 'js-cookie';
import { type Adapter } from './Adapter';
import Storage, { type EncodedValue } from './../Storage';

export type { CookieOptions };

class CookieAdapter implements Adapter {
    options: CookieOptions;

    constructor(options: CookieOptions = {}) {
        this.options = options;
    }

    getItem(key: string): ?string {
        return Cookies.get(key);
    }

    setItem(key: string, data: string): void {
        const decoded: EncodedValue | string = Storage.tryParseJson(data);

        if (typeof decoded === 'object' && decoded.expire) {
            const time = new Date();
            time.setTime(decoded.expire);

            Cookies.set(key, data, {
                ...this.options,
                expires: time,
            });

            return;
        }

        Cookies.set(key, data, this.options);
    }

    removeItem(key: string): void {
        Cookies.remove(key, this.options);
    }
}

export default CookieAdapter;
