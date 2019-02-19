import * as fs from 'fs';
import { Adapter } from './Adapter';

export default class FileAdapter implements Adapter {
    /**
     * Path of file.
     */
    private path: string;

    /**
     * @param path - Path of file where will be data stored
     */
    public constructor(path: string) {
        this.path = path;
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify({}), 'utf8');
        }
    }

    private getFileContent(): Record<string, any> {
        return JSON.parse(fs.readFileSync(this.path).toString());
    }

    public updateData(data: Record<string, any>) {
        fs.writeFileSync(this.path, JSON.stringify(data));
    }

    public getItem(key: string): string | null {
        // @ts-ignore
        return this.getFileContent()[key];
    }

    public setItem(key: string, value: string): void {
        this.updateData({
            ...this.getFileContent(),
            [key]: value,
        });
    }

    public removeItem(key: string): void {
        const data = this.getFileContent();
        // @ts-ignore
        delete data[key];
        this.updateData(data);
    }
}
