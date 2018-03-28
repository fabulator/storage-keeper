// @flow
import { type Adapter } from './adapters/Adapter';

export type EncodedValue = {
    expire: number,
    value: string | null,
}

class Storage {
    prefix: string;
    storeAdapter: Adapter;

    constructor(prefix: string = '', storeAdapter: Adapter = localStorage) {
        this.prefix = prefix;
        this.storeAdapter = storeAdapter;
    }

    /**
     * Get value from storage.
     *
     * @param {string} key - storage key
     * @returns {string | Object | null} content of storage
     */
    get(key: string): string | Object | null {
        const value: ?string = this.storeAdapter.getItem(`${this.prefix}${key}`);

        if (!value) {
            return null;
        }

        try {
            return this.parseEncodedValue(JSON.parse(value), key);
        } catch (error) {
            return value;
        }
    }

    /**
     * Parse object saved in storage.
     *
     * @param {Object} object - Save object
     * @param {string} key - Key of item
     * @returns {string | Object | null} Decoded value
     */
    parseEncodedValue(object: EncodedValue | Object, key: string): string | Object | null {
        // is value expired?
        if (object.expire && object.value && object.expire < Date.now()) {
            this.remove(key);
            return null;
        } else if (object.expire && object.value) {
            return Storage.tryParseJson(object.value);
        }

        return object;
    }

    /**
     * Try to parse json.
     *
     * @param {string} json - Possible encoded json
     * @returns {Object | string} Decoded json or source string
     */
    static tryParseJson(json: string): Object | string {
        try {
            return JSON.parse(json);
        } catch (error) {
            return json;
        }
    }

    /**
     * Remove item from storage.
     *
     * @param {string} key - key to remove
     */
    remove(key: string) {
        this.storeAdapter.removeItem(`${this.prefix}${key}`);
    }

    /**
     * Set new item to storage.
     *
     * @param {string} key - key of item
     * @param {*} value - value of item
     * @param {Date} expire - date of expire
     */
    set(key: string, value: string | number | Object | null, expire: ?Date): void {
        let valueToSave = typeof value === 'number' ? value.toString() : value;
        if (expire) {
            valueToSave = {
                expire: expire.getTime(),
                value,
            };
        }

        this.storeAdapter.setItem(`${this.prefix}${key}`, typeof valueToSave === 'object' ? JSON.stringify(valueToSave) : valueToSave);
    }
}

export default Storage;
