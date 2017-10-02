import Router from 'koa-router'
import UploadFile from '../controllers/UploadFileController'

const router = new Router({
    prefix: '/api'
});

router
    .get('/uploads/:path/:filename', UploadFile.download)
    .post('/upload-file', UploadFile.upload);

export default router