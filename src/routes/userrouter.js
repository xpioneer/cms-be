import Router from 'koa-router'
import Usertl from '../controllers/UserController'

const router = new Router({
    prefix: '/api/user'
});

router
    .get('/', Usertl.pages)
    .get('/:id', Usertl.getById)
    .put('/:id', Usertl.update)
    .post('/', Usertl.insert)
    .del('/:id', Usertl.delete);

export default router