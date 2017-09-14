export default async(ctx, next) => {
    try {
        console.log('before-------------------next()')
        await next()
        const status = ctx.status || 404;
        console.log(status, 'after-------------------next()')
        if (status === 404) {
            ctx.throw(404)
        }
    } catch (err) {
        let status = err.status || 500;
        console.log(err, '-------------------catch')
        ctx.status = status;
        if(status === 404){
            return ctx.Json({status: 404, data: null, msg: '未找到资源'})
        }
        else {
            return ctx.Json({status: status, data: err.data ? err.data.toString() : err.toString(), msg: err.data});
        }
    }
}