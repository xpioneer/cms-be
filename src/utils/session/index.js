import Store from "./store.js";

const Session = (opts = {}) => {
    const { key = "session_id", store = new Store() } = opts;

    return async(ctx, next) => {
        let id = ctx.cookies.get(key, opts);

        if (id) {
            ctx.session = await opts.store.get(id);
            if (typeof ctx.session != "object" || ctx.session == null) {
                ctx.session = {};
            }
        } else {
            ctx.session = {};
        }

        const old = JSON.stringify(ctx.session);

        await next(); // any calc

        if (old == JSON.stringify(ctx.session)) return;

        // if is an empty object
        if (ctx.session instanceof Object && !Object.keys(ctx.session).length) {
            ctx.session = null;
        }

        // need clear old session
        if (id && !ctx.session) {
            await store.destroy(id, ctx);
            return;
        }

        // set/update session
        const sid = await store.set(ctx.session, Object.assign({}, opts, { sid: id }), ctx);
        ctx.cookies.set(key, sid, opts);

    }
};

export default Session;



// import Store  from "./store.js";

// const Session = function(opts = {}) {
//     console.log(opts);
//     opts.key = opts.key || "session_id";
//     opts.store = opts.store || new Store();

//     return  (ctx, next) => {
//         let id = ctx.cookies.get(opts.key, opts);

//         let promise = Promise.resolve();
//         let old = {};

//         if(id) {
//             promise = opts.store.get(id).then(session => {
//                 ctx.session = session;
//                 // check session should be a no-null object
//                 if(typeof ctx.session != "object" || ctx.session == null) {
//                     ctx.session = {};
//                 }
//             });
//         } else {
//             ctx.session = {};
//         }

//         return promise.then(() => {
//             old = JSON.stringify(ctx.session);
//             return next();
//         }).then(() => {
//             // no modify
//             if(old == JSON.stringify(ctx.session)) return;

//             return Promise.resolve().then(() => {
//                 // destory old session
//                 if(id) {
//                     id = null;
//                     return opts.store.destroy(id);
//                 }
//             }).then(() => {

//                 if(ctx.session && Object.keys(ctx.session).length) {
//                     // set new session
//                     return opts.store.set(ctx.session, Object.assign({}, opts, {sid: id})).then(sid => {
//                         //创建cookie
//                         ctx.cookies.set(opts.key, sid, opts)
//                     });
//                 }
//             });
//         });

//     }
// };

// export default Session;