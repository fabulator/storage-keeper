import Storage from './Storage';

export default class SessionStorage extends Storage {
    /**
     * @param prefix - Prefix of storage key
     */
    public constructor(prefix = '') {
        super(prefix, sessionStorage);
    }
}
