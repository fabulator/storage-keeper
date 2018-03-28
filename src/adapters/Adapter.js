// @flow

export interface Adapter {
    getItem(key: string): ?string;
    setItem(key: string, data: string): void;
    removeItem(key: string): void;
}
