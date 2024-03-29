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

    public async getItem(key: string) {
        return this.getFileContent()[key];
    }

    public async setItem(key: string, value: string) {
        this.updateData({
            ...this.getFileContent(),
            [key]: value,
        });
    }

    public async removeItem(key: string) {
        const data = this.getFileContent();

        delete data[key];
        this.updateData(data);
    }
}
