// xpioneer

import UploadFile from '../controllers/UploadFileController';

const PROD = process.env.NODE_ENV === "production";

export default async (ctx, next) => {
  const method = ctx.method || 'POST';
  const cur_user =  ctx.session['CUR_USER'];
  const auth_token =  ctx.session['AUTH_TOKEN'];
  // console.log('cur_user', ctx.session)
  // await next();
  if (!PROD && ctx.query['root'] == 99) {
    await next();
  } else {
    if (ctx.url.match(/^\/api\/login/) && method === 'POST') {
      await next();
    } else {
      let key = ctx.header['Authorization-User'] || ctx.header['authorization-user'] || ctx.query['Authorization-User'];
      if (cur_user && ctx.url.match(/^\/(api|uploads)\//)) {
        if (key && key.length === 64 && auth_token === key) {
          if (method !== 'GET' && cur_user.user_type == 9 && !ctx.url.match(/^\/api\/logout/)) {
            ctx.throw(403, '禁止访问！');
          }
          await next();
        } else {
          ctx.session = {};
          ctx.throw(401);
        }
      } else {
        ctx.session = {};
        ctx.throw(401);
      }
    }
  }
};
