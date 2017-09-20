import TOOLS from '../tools';

const { Guid } = TOOLS;

class Store {
    constructor() {
        this.session = {};
    }
 
    decode(string) {
        if(!string) return "";
 
        let session = "";
 
        try{
            //存在session
            session = new Buffer(string, "base64").toString();
        } catch(e) {}
        
        return JSON.parse(session);
    }
 
    encode(obj) {
        //滚成buffer
        return new Buffer(obj).toString("base64");
    }
 
    getID() {
        return Guid() + Guid();
    }
 
    get(sid) {
        return Promise.resolve(this.decode(this.session[sid]));
    }
 
    set(session, opts) {
        opts = opts || {};
        let sid = opts.sid;
        if(!sid) {
            //Uid
            sid = this.getID(24);
        }
 
        this.session[sid] = this.encode(JSON.stringify(session));
 
        return Promise.resolve(sid);
    }
 
    destroy(sid) {
        delete this.session[sid];
        return Promise.resolve();
    }
}

module.exports = Store;