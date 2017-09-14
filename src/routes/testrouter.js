import Router from 'koa-router'
import Test from '../controllers/TestController'

const router = new Router({
	prefix: '/api/test'
});

router
	.get('/test200', Test.test200)
	.get('/test400', Test.test400)
	.get('/test401', Test.test401)
	.get('/test403', Test.test403)
	.get('/test404', Test.test404)
	.get('/test405', Test.test405)
	.get('/test406', Test.test406)
	.get('/test500', Test.test500)
	.get('/test501', Test.test501)
	.get('/home', Test.index)
	.get('/testmock', Test.testmock)
	.get('/page', Test.pages)
	.delete('/delete', Test.delete)
	.get('/testproxy', Test.proxy)
	.get('/attack', Test.attack);

export default router