import Router from 'koa-router'
import SystemLogCtl from '../controllers/SystemLogController'

const router = new Router({
    prefix: '/api'
});

router
    .param('/systemlog', function(id, ctx, next){
        console.log(id)
    })
    .get('/systemlog', SystemLogCtl.pages)
    .get('/systemlog/:id', SystemLogCtl.getById)
    // .put('/:id', SystemLogCtl.update)
    .post('/systemlog', SystemLogCtl.insert)
    .del('/systemlog/:id', SystemLogCtl.delete)
    .post('/system/geoinfo', SystemLogCtl.updateGeoIp);

export default router