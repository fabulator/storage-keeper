// @flow strict
import Storage from './Storage';

export default class LocalStorage extends Storage {
    /**
     * @param prefix - Prefix of storage key
     */
    constructor(prefix: string = '') {
        super(prefix, localStorage);
    }
}
