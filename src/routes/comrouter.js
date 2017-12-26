import Router from 'koa-router';
import UploadFile from '../controllers/UploadFileController';

const router = new Router({
  prefix: ''
});

router
  .get('/uploads/:path/:filename', UploadFile.download)
  .post('/api/upload-file', UploadFile.upload);

export default router;
