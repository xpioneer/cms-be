import { randomBytes } from 'crypto';
import TOOLS from '../tools';

const { Guid } = TOOLS;

class Store {
    constructor() {
        this.sessions = new Map();
        this.__timer = new Map();
        this.session = {};
    }
 
    getID(length) {
        return randomBytes(length).toString('hex');
    }
 
    get(sid) {
        if(!this.sessions.has(sid)){
            return undefined;
        }
        return JSON.parse(this.sessions.get(sid));
    }

    set(session, { sid =  this.getID(32), maxAge } = {}) {
        if (this.sessions.has(sid) && this.__timer.has(sid)) {
            const __timeout = this.__timer.get(sid);
            if (__timeout) clearTimeout(__timeout);
        }

        if (maxAge) {
            this.__timer.set(sid, setTimeout(() => this.destroy(sid), maxAge));
        }
        try {
            this.sessions.set(sid, JSON.stringify(session));
        } catch (err) {
            console.log('Set session error:', err);
        }

        return sid;
    }
 
    destroy(sid) {
        delete this.session[sid];
        return Promise.resolve();
    }
}

export default Store;

