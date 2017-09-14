import Redis from "ioredis";
import { Store } from "koa-session2";

export default class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis();
  }

  async get(sid) {
    //return await this.redis.get(`SESSION:${sid}`);
    let data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }

  async set(session, opts) {
    console.log(session, opts)
    if (!opts.sid) {
      opts.sid = this.getID(24);
    }
    // console.log(session, opts)
    const result = await this.redis.set(`SESSION:${opts.sid}`, JSON.stringify(session));
    console.log(result, opts)
    return opts.sid;
  }

  async destroy(sid) {
    return await this.redis.del(`SESSION:${sid}`);
  }
}