export default async(ctx, next) => {
    try {
        await next();
        console.log(ctx.status, ctx.url, 'ctx.status')
        const status = ctx.status || 404;
        if (status === 404 && !ctx.url.match(/^\/api\/uploads\//)) {
            ctx.throw(404)
        }
    } catch (err) {
        console.log('catch', err)
        let status = err.status || 500;
        ctx.status = status;
        if(status === 404){
            ctx.body = {status: 404, data: null, msg: '未找到资源'};
        }
        else {
            console.log(err)
            let msg = err.data ? err.data.toString() : err.toString();
            ctx.body = {status: status, data: msg, msg: msg};
        }
    }
}