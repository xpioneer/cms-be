import Router from 'koa-router'
import CommentCtl from '../controllers/CommentController'

const router = new Router({
    prefix: '/api/comment'
});

router
    .param('/', function(id, ctx, next){
        console.log(id)
    })
    .get('/', CommentCtl.pages)
    .get('/:id', CommentCtl.getById)
    .put('/:id', CommentCtl.update)
    .post('/', CommentCtl.insert)
    .del('/:id', CommentCtl.delete);

export default router