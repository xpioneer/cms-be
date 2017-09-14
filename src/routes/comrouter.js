import Router from 'koa-router'
import UploadFile from '../controllers/UploadFileController'

console.log(UploadFile.id, UploadFile.test, UploadFile.upload)

const router = new Router({
    prefix: '/api'
});

router
    .post('/upload-file', UploadFile.upload);

export default router