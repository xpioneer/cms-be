import Cors from 'koa2-cors';

const _PROD_ = process.env.NODE_ENV === 'production'

export default Cors({
  origin: function (ctx) {
    const origin = ctx.header.origin
    // if (ctx.url === '/add') {
    //   return false;
    // }
    if (_PROD_) {
      return false;
    } else {
      return origin;
    }
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization-User', 'X-Requested-With', 'Accept', 'Token']
});
