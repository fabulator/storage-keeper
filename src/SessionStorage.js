// @flow strict
import Storage from './Storage';

export default class SessionStorage extends Storage {
    /**
     * @param prefix - Prefix of storage key
     */
    constructor(prefix: any = '') {
        super(prefix, sessionStorage);
    }
}
