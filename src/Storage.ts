import { Adapter } from './adapters/Adapter';
import tryParseJson from './tryParseJson';

export interface EncodedValue {
    expire: number,
    value: string | null,
}

export default class Storage {
    /**
     * Storage key prefix
     */
    private prefix: string;

    /**
     * Adapter for storing and getting values
     */
    private storeAdapter: Adapter;

    /**
     *
     * @param prefix - Storage key prefix
     * @param storeAdapter - Adapter for storing and getting values
     */
    public constructor(prefix = '', storeAdapter: Adapter = localStorage) {
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
    private _parseEncodedValue(object: EncodedValue | Record<string, any>, key: string): string | Record<string, any> | null {
        // is value expired?

        // @ts-ignore
        if (object.expire && object.value && object.expire < Date.now()) {
            this.remove(key);
            return null;
            // @ts-ignore
            // eslint-disable-next-line
        } else if (object.expire && object.value) {
            // @ts-ignore
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
    public get(key: string): string | Record<string, any> | null {
        const value = this.storeAdapter.getItem(`${this.prefix}${key}`);

        if (!value) {
            return null;
        }

        try {
            return this._parseEncodedValue(JSON.parse(value), key);
        } catch (exception) {
            return value;
        }
    }

    /**
     * Remove item from storage.
     *
     * @param key - key to remove
     */
    public remove(key: string) {
        this.storeAdapter.removeItem(`${this.prefix}${key}`);
    }

    /**
     * Set new item to storage.
     *
     * @param key - key of item
     * @param value - value of item
     * @param expire - date of expire
     */
    public set(key: string, value: string | number | Record<string, any> | null, expire?: Date): void {
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
