import * as Cookie from 'js-cookie';
import { Adapter } from './Adapter';
import { EncodedValue } from '../Storage';
import tryParseJson from '../tryParseJson';

export default class CookieAdapter implements Adapter {
    /**
     * Options for js-cookie library
     */
    private options: Cookie.CookieAttributes;

    /**
     * @param options - Options for js-cookie library
     */
    public constructor(options: Cookie.CookieAttributes = {}) {
        this.options = options;
    }

    public async getItem(key: string) {
        return Cookie.get(key) || null;
    }

    public async setItem(key: string, data: string) {
        // @ts-ignore
        const decoded: EncodedValue | string = tryParseJson(data);

        if (typeof decoded === 'object' && decoded.expire) {
            const time = new Date();
            time.setTime(decoded.expire);

            Cookie.set(key, data, {
                ...this.options,
                expires: time,
            });

            return;
        }

        Cookie.set(key, data, this.options);
    }

    public async removeItem(key: string) {
        Cookie.remove(key, this.options);
    }
}
