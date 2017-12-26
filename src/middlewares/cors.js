import Cors from 'koa2-cors';

export default Cors({
  origin: function (ctx) {
    if (ctx.url === '/add') {
      return false;
    }
    if (process.env.NODE_ENV == 'development') {
      // return 'http://localhost:7001';//'*';
      return '*';
    } else {
      return false;
    }
    // return 'http://localhost:6001';
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization-User', 'X-Requested-With', 'Accept', 'token']
});
