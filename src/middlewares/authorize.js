// qinfeng

export default async(ctx, next) => {
    await next();
    // if(ctx.url.indexOf('/api/') == 0){
    //     console.log(ctx.query)
    //     // await next();
    //     if(ctx.query['nologin'] == 99){
    //         await next();
    //     }else{
    //         console.log(`ctx.header['Authorization-User']`, ctx.header['Authorization-User']);
    //         let key = ctx.header['Authorization-User'] || ctx.header['authorization-user'] || ctx.query['Authorization-User'];
    //         if(key && key.length != 64){//长度不够，直接throw 406
    //             ctx.throw(406)
    //         }
    //         let isAuthorized = '579ad6c390cbda762e8860d66a67fa739cd342955b94c0ff9419854ff23cfdf3' === key;
    //         isAuthorized ? await next() : ctx.throw(406)
    //     }
    // }else{
    //     await ctx.render('index', {});
    // }
}
