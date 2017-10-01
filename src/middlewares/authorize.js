// qinfeng

const PROD = process.env.NODE_ENV === "production";

export default async(ctx, next) => {
    const method = ctx.method || 'POST';
    const cur_user =  ctx.session['CUR_USER'];
    const auth_token =  ctx.session['AUTH_TOKEN'];
    // console.log('cur_user', ctx.session)
    if(ctx.url.indexOf('/api/login') == 0 && method === 'POST'){
        await next();
    } else {
        if(cur_user && ctx.url.indexOf('/api/') == 0){
            let key = ctx.header['Authorization-User'] || ctx.header['authorization-user'] || ctx.query['Authorization-User'];
            if(!key || (key && key.length !== 64)){
                ctx.throw(401);
            }
            if(auth_token === key){
                if(method !== 'GET' && cur_user.user_type == 9 && ctx.url.indexOf('/api/logout') !== 0){
                    ctx.throw(403, '禁止访问！');
                }
                await next();
            } else {
                ctx.throw(401);
            }
        }else {
            ctx.throw(401);
        }
    }
}
