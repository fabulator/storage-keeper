export interface Adapter {
    getItem(key: string): string | null,
    setItem(key: string, data: string): void,
    removeItem(key: string): void,
}
