// @flow
import Storage from './Storage';

class SessionStorage extends Storage {
    constructor(prefix: string = '') {
        super(prefix, sessionStorage);
    }
}

export default SessionStorage;
