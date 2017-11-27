import { randomBytes } from 'crypto';
import Redis from 'ioredis';
import { Store } from 'koa-session2';
import { RedisConfig } from '../../config/DBConfig'
import TOOLS from '../tools';

// const { Guid } = TOOLS;

class RedisStore extends Store {
    constructor() {
        super();
        // this.sessions = new Map();
        // this.__timer = new Map();
        // this.session = {};
        this.redis = new Redis(RedisConfig);
    }

    getID(length) {
        return randomBytes(length).toString('hex');
    }

    // get(sid) {
    //     if (!this.sessions.has(sid)) {
    //         return undefined;
    //     }
    //     return JSON.parse(this.sessions.get(sid));
    // }

    // set(session, { sid = this.getID(32), maxAge } = {}) {
    //     if (this.sessions.has(sid) && this.__timer.has(sid)) {
    //         const __timeout = this.__timer.get(sid);
    //         if (__timeout) clearTimeout(__timeout);
    //     }

    //     if (maxAge) {
    //         this.__timer.set(sid, setTimeout(() => this.destroy(sid), maxAge));
    //     }
    //     try {
    //         this.sessions.set(sid, JSON.stringify(session));
    //     } catch (err) {
    //         console.log('Set session error:', err);
    //     }

    //     return sid;
    // }

    // destroy(sid) {
    //     this.sessions.delete[sid];
    //     return Promise.resolve();
    // }

    async get(sid) {
        let data = await this.redis.get(`${sid}`);
        return JSON.parse(data);
    }
 
    async set(session, { sid =  this.getID(32), maxAge } = {}) {
        try {
            await this.redis.set(session['CUR_USER'].id, `${sid}`, 'PX', maxAge);
            await this.redis.set(`${sid}`, JSON.stringify(session), 'PX', maxAge);
        } catch (e) {}
        return sid;
    }

    async destroy(sid) {
        const Session = await this.get(sid);
        if(Session && Session.CUR_USER) {
            await this.redis.del(`${Session.CUR_USER.id}`)
        }
        return await this.redis.del(`${sid}`);
    }

    async checkLogin(userId) {
        const sid = await this.redis.get(`${userId}`);
        if(sid) await this.destroy(sid);
        return sid;
    }
}

export default RedisStore;
