import Router from 'koa-router'
import ChartCtl from '../controllers/ChartController'

const router = new Router({
    prefix: '/api/chart'
});

router
    .param('/', function(id, ctx, next){
        console.log(id)
    })
    .get('/systemlog', ChartCtl.getSystemLog)
    .get('/systemlogdate', ChartCtl.getSystemLogDate)
    .get('/articletype', ChartCtl.getArticleType)
    .get('/articletag', ChartCtl.getArticleTag);

export default router