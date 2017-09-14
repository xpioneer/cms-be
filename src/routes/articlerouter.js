import Router from 'koa-router'
import ArticleCtl from '../controllers/ArticleController'

const router = new Router({
	prefix: '/api/article'
});

router
    .get('/', ArticleCtl.pages)
	.get('/:id', ArticleCtl.getById)
    .put('/:id', ArticleCtl.update)
    .post('/', ArticleCtl.insert)
    .del('/:id', ArticleCtl.delete);

export default router