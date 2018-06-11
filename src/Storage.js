// @flow strict
import { type Adapter } from './adapters/Adapter';
import tryParseJson from './tryParseJson';

export type EncodedValue = {
    expire: number,
    value: string | null,
}

export default class Storage {
    /**
     * Storage key prefix
     */
    prefix: string;

    /**
     * Adapter for storing and getting values
     */
    storeAdapter: Adapter;

    /**
     *
     * @param prefix - Storage key prefix
     * @param storeAdapter - Adapter for storing and getting values
     */
    constructor(prefix: string = '', storeAdapter: Adapter = localStorage) {
        this.prefix = prefix;
        this.storeAdapter = storeAdapter;
    }

    /**
     * Parse object saved in storage.
     *
     * @private
     * @param object - Save object
     * @param key - Key of item
     * @returns Decoded value
     */
    _parseEncodedValue(object: EncodedValue | Object, key: string): string | Object | null {
        // is value expired?
        if (object.expire && object.value && object.expire < Date.now()) {
            this.remove(key);
            return null;
        } else if (object.expire && object.value) {
            return tryParseJson(object.value);
        }

        return object;
    }

    /**
     * Get value from storage.
     *
     * @param key - storage key
     * @returns content of storage
     */
    get(key: string): string | Object | null {
        const value: ?string = this.storeAdapter.getItem(`${this.prefix}${key}`);

        if (!value) {
            return null;
        }

        try {
            return this._parseEncodedValue(JSON.parse(value), key);
        } catch (error) {
            return value;
        }
    }

    /**
     * Remove item from storage.
     *
     * @param key - key to remove
     */
    remove(key: string) {
        this.storeAdapter.removeItem(`${this.prefix}${key}`);
    }

    /**
     * Set new item to storage.
     *
     * @param key - key of item
     * @param value - value of item
     * @param expire - date of expire
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
