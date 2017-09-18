// qinfeng

const PROD = process.env.NODE_ENV === "production";

export default async(ctx, next) => {
    const cur_user =  ctx.session['CUR_USER'];
    const auth_token =  ctx.session['AUTH_TOKEN'];
    console.log(cur_user, 'cur_user')
    if(cur_user && ctx.url.indexOf('/api/') == 0){
        if(!PROD && ctx.query['nologin'] == 99){
            await next();
        }else{
            let key = ctx.header['Authorization-User'] || ctx.header['authorization-user'] || ctx.query['Authorization-User'];
            if(key && key.length != 64){
                ctx.throw(401)
            }
            auth_token === key ? await next() : ctx.throw(401)
        }
    } else if(!cur_user && ctx.url.indexOf('/api/login') == 0) {
        await next();
    } else {
        await next();
    }
}
