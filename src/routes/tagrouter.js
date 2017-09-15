import Router from 'koa-router'
import TagCtl from '../controllers/TagController'

const router = new Router({
    prefix: '/api/tag'
});

router
    .get('/', TagCtl.pages)
    .get('/:id', TagCtl.getById)
    .put('/:id', TagCtl.update)
    .post('/', TagCtl.insert)
    .del('/:id', TagCtl.delete);

export default router