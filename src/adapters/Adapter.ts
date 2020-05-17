export interface Adapter {
    getItem(key: string): Promise<string | null> | string | null,
    setItem(key: string, data: string): Promise<void> | void,
    removeItem(key: string): Promise<void> | void,
}
