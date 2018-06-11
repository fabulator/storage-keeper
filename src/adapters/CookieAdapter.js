// @flow strict
import Cookies, { type CookieOptions } from 'js-cookie';
import { type Adapter } from './Adapter';
import { type EncodedValue } from './../Storage';
import tryParseJson from './../tryParseJson';

export type { CookieOptions };

export default class CookieAdapter implements Adapter {
    /**
     * Options for js-cookie library
     */
    options: CookieOptions;

    /**
     * @param options - Options for js-cookie library
     */
    constructor(options: CookieOptions = {}) {
        this.options = options;
    }

    getItem(key: string): ?string {
        return Cookies.get(key);
    }

    setItem(key: string, data: string): void {
        const decoded: EncodedValue | string = tryParseJson(data);

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
