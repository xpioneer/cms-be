import Router from 'koa-router'
import Test from '../controllers/TestController'

const router = new Router({
	prefix: '/api/test'
});

router
	.post('/status/:status', Test.testStatus)
	.get('/home', Test.index)
	.get('/testmock', Test.testmock)
	.get('/page', Test.pages)
	.delete('/delete', Test.delete)
	// .get('/testproxy', Test.proxy)
	// .get('/attack', Test.attack);

export default router