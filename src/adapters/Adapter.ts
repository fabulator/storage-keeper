export interface Adapter {
    getItem(key: string): Promise<string | null> | string | null;
    removeItem(key: string): Promise<void> | void;
    setItem(key: string, data: string): Promise<void> | void;
}
