// qinfeng

const PROD = process.env.NODE_ENV === "production";

export default async(ctx, next) => {
    const cur_user =  ctx.session['CUR_USER'];
    const auth_token =  ctx.session['AUTH_TOKEN'];
    console.log('cur_user', ctx.session)
    if(ctx.url.indexOf('/api/login') == 0){
        await next();
    } else {
        if(cur_user && ctx.url.indexOf('/api/') == 0){
            let key = ctx.header['Authorization-User'] || ctx.header['authorization-user'] || ctx.query['Authorization-User'];
            if(!key || (key && key.length !== 64)){
                ctx.throw(401);
            }
            if(auth_token === key){
                await next();
            } else {
                ctx.throw(401);
            }
        }else {
            ctx.throw(401);
        }
    }
}
