import Router from 'koa-router'
import ArticleTypeCtl from '../controllers/ArticleTypeController'

const router = new Router({
    prefix: '/api/articletype'
});

router
    .get('/', ArticleTypeCtl.pages)
    .get('/:id', ArticleTypeCtl.getById)
    .put('/:id', ArticleTypeCtl.update)
    .post('/', ArticleTypeCtl.insert)
    .del('/:id', ArticleTypeCtl.delete);

export default router