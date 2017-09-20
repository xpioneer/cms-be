import Router from 'koa-router'
import Accountrtl from '../controllers/AccountController'

const router = new Router({
    prefix: '/api'
});

router
    .post('/login', Accountrtl.login)
    .post('/logout', Accountrtl.logout);

export default router