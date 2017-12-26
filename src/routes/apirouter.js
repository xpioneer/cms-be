// xpioneer

import Router from 'koa-router'
import Accountrtl from '../controllers/AccountController'
import ArticleCtl from '../controllers/ArticleController'
import ArticleTypeCtl from '../controllers/ArticleTypeController'
import TagCtl from '../controllers/TagController'
import CommentCtl from '../controllers/CommentController'
import Usertl from '../controllers/UserController'
import SystemLogCtl from '../controllers/SystemLogController'
import ChartCtl from '../controllers/ChartController'

// test
import Test from '../controllers/TestController';


const router = new Router({
    prefix: '/api'
});

router
    // account
    .post('/login', Accountrtl.login)
    .post('/logout', Accountrtl.logout)

    // article
    .get('/article/', ArticleCtl.pages)
    .get('/article/:id', ArticleCtl.getById)
    .put('/article/:id', ArticleCtl.update)
    .post('/article/', ArticleCtl.insert)
    .del('/article/:id', ArticleCtl.delete)

    // articletype
    .get('/articletype/', ArticleTypeCtl.pages)
    .get('/articletype/:id', ArticleTypeCtl.getById)
    .put('/articletype/:id', ArticleTypeCtl.update)
    .post('/articletype/', ArticleTypeCtl.insert)
    .del('/articletype/:id', ArticleTypeCtl.delete)

    // tag
    .get('/tag/', TagCtl.pages)
    .get('/tag/:id', TagCtl.getById)
    .put('/tag/:id', TagCtl.update)
    .post('/tag/', TagCtl.insert)
    .del('/tag/:id', TagCtl.delete)

    // comment
    .get('/comment/', CommentCtl.pages)
    .get('/comment/:id', CommentCtl.getById)
    .put('/comment/:id', CommentCtl.update)
    .post('/comment/', CommentCtl.insert)
    .del('/comment/:id', CommentCtl.delete)

    // user
    .get('/user/', Usertl.pages)
    .get('/user/:id', Usertl.getById)
    .put('/user/:id', Usertl.update)
    .post('/user/', Usertl.insert)
    .del('/user/:id', Usertl.delete)

    // systemlog
    .get('/systemlog', SystemLogCtl.pages)
    .get('/systemlog/:id', SystemLogCtl.getById)
    // .put('/:id', SystemLogCtl.update)
    .post('/systemlog', SystemLogCtl.insert)
    .del('/systemlog/:id', SystemLogCtl.delete)
    .post('/system/geoinfo', SystemLogCtl.updateGeoIp)

    // chart
    .get('/chart/systemlog', ChartCtl.getSystemLog)
    .get('/chart/systemlogdate', ChartCtl.getSystemLogDate)
    .get('/chart/articletype', ChartCtl.getArticleType)
    .get('/chart/articletag', ChartCtl.getArticleTag)

    // test
    .post('/test/status/:status', Test.testStatus)
    .post('/test/ip/:ip', Test.getIPGeo)
    .get('/test/home', Test.index)
    .get('/test/testmock', Test.testmock)
    .get('/test/page', Test.pages)
    .delete('/test/delete', Test.delete)

export default router