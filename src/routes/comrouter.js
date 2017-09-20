import Router from 'koa-router'
import UploadFile from '../controllers/UploadFileController'

const router = new Router({
    prefix: '/api'
});

router
    .post('/upload-file', UploadFile.upload);

export default router