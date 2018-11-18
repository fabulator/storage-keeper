import Storage from './Storage';

export default class LocalStorage extends Storage {
    /**
     * @param prefix - Prefix of storage key
     */
    public constructor(prefix = '') {
        super(prefix, localStorage);
    }
}
