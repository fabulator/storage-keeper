import { Adapter } from './adapters/Adapter';
import tryParseJson from './tryParseJson';

export interface EncodedValue {
    expire: number;
    value: string | null;
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

        if (object.expire && object.value && object.expire < Date.now()) {
            this.remove(key);
            return null;
            // eslint-disable-next-line
        } else if (object.expire && object.value) {
            return tryParseJson(object.value);
        }

        return object;
    }

    public async get(key: string): Promise<string | Record<string, any> | null> {
        const value = await this.storeAdapter.getItem(`${this.prefix}${key}`);

        if (!value) {
            return null;
        }

        try {
            return this._parseEncodedValue(JSON.parse(value), key);
        } catch {
            return value;
        }
    }

    public async remove(key: string) {
        return this.storeAdapter.removeItem(`${this.prefix}${key}`);
    }

    public async set(key: string, value: string | number | Record<string, any> | null, expire?: Date) {
        let valueToSave = typeof value === 'number' ? value.toString() : value;
        if (expire) {
            valueToSave = {
                expire: expire.getTime(),
                value,
            };
        }

        return this.storeAdapter.setItem(
            `${this.prefix}${key}`,
            typeof valueToSave === 'object' ? JSON.stringify(valueToSave) : valueToSave,
        );
    }
}
