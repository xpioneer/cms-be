export default async(ctx, next) => {
    try {
        await next()
        const status = ctx.status || 404;
        if (status === 404) {
            ctx.throw(404)
        }
    } catch (err) {
        let status = err.status || 500;
        ctx.status = status;
        if(status === 404){
            return ctx.Json({status: 404, data: null, msg: '未找到资源'})
        }
        else {
            console.log(err)
            let msg = err.data ? err.data.toString() : err.toString();
            return ctx.Json({status: status, data: msg, msg: msg});
        }
    }
}