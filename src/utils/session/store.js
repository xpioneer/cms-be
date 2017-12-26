import { randomBytes } from 'crypto';
import Redis from 'ioredis';
import { Store } from 'koa-session2';
import { RedisConfig } from '../../config/DBConfig';
import TOOLS from '../tools';

// const { Guid } = TOOLS;

class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis(RedisConfig);
  }

  getID(length) {
    return randomBytes(length).toString('hex');
  }

  async get(sid) {
    let data = await this.redis.get(sid);
    return JSON.parse(data);
  }

  async setLog(sl, { sid =  this.getID(32), maxAge } = {}) {
    try {
      await this.redis.set(`system_log:${sid}`, JSON.stringify(sl), 'PX', maxAge);
    } catch (e) {}
    return sid;
  }
 
  async set(session, { sid =  this.getID(32), maxAge } = {}) {
    try {
      console.log(sid, 'sid');
      await this.redis.set(session['CUR_USER'].id, sid, 'PX', maxAge);
      await this.redis.set(sid, JSON.stringify(session), 'PX', maxAge);
    } catch (e) {}
    return sid;
  }

  async destroy(sid) {
    return await this.redis.del(sid);
  }

  async checkLogin(userId) {
    const sid = await this.redis.get(userId);
    if (sid) await this.destroy(sid);
    return sid;
  }
}

export default RedisStore;
