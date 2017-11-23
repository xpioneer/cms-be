import Logger from './systemlog'

export default async(ctx, next) => {
    const start = Date.now();
    try {
        await next();
        const status = ctx.status || 404;
        if(status === 404){
            ctx.throw(404);
        }
        Logger(ctx, start, status); // log
    } catch (err) {
        // console.log('catch', err, err.status)
        try{
            let status = err.status || 500;
            Logger(ctx, start, status, err.toString()); // log
            ctx.status = status;
            if(status === 404){
                ctx.body = {status: 404, data: null, msg: '未找到资源'};
            }
            else {
                let msg = err.data ? err.data.toString() : err.toString();
                ctx.body = {status: status, data: null, msg: msg};
            }
        }catch(e) {
            let msg = e.data ? e.data.toString() : e.toString();
            ctx.body = {status: 500, data: null, msg: msg};
        }
    }
}