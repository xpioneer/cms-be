import Router from 'koa-router'
import SystemLogCtl from '../controllers/SystemLogController'

const router = new Router({
    prefix: '/api/systemlog'
});

router
    .param('/', function(id, ctx, next){
        console.log(id)
    })
    .get('/', SystemLogCtl.pages)
    .get('/:id', SystemLogCtl.getById)
    // .put('/:id', SystemLogCtl.update)
    .post('/', SystemLogCtl.insert)
    .del('/:id', SystemLogCtl.delete);

export default router