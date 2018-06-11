// @flow strict
import fs from 'fs';
import { type Adapter } from './Adapter';

export default class FileAdapter implements Adapter {
    /**
     * Path of file.
     */
    path: string;

    /**
     * @param path - Path of file where will be data stored
     */
    constructor(path: string) {
        this.path = path;
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify({}), 'utf8');
        }
    }

    getFileContent(): Object {
        return JSON.parse(fs.readFileSync(this.path).toString());
    }

    updateData(data: Object) {
        fs.writeFileSync(this.path, JSON.stringify(data));
    }

    getItem(key: string): ?string {
        return this.getFileContent()[key];
    }

    setItem(key: string, value: string): void {
        this.updateData({
            ...this.getFileContent(),
            [key]: value,
        });
    }

    removeItem(key: string): void {
        const data = this.getFileContent();
        delete data[key];
        this.updateData(data);
    }
}
