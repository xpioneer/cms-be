export default async(ctx, next) => {
    try {
        await next();
        const status = ctx.status || 404;
        if(status === 404){
            ctx.throw(404);
        }
    } catch (err) {
        // console.log('catch', err, err.status)
        try{
            let status = err.status || 500;
            ctx.status = status;
            if(status === 404){
                ctx.body = {status: 404, data: null, msg: '未找到资源'};
            }
            else {
                let msg = err.data ? err.data.toString() : err.toString();
                ctx.body = {status: status, data: msg, msg: msg};
            }
        }catch(e) {
            let msg = e.data ? e.data.toString() : e.toString();
            ctx.body = {status: 500, data: msg, msg: msg};
        }
    }
}