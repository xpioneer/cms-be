//qinfeng

import testRouter from './testrouter'//测试路由
import articleRouter from './articlerouter';
import articleTypeRouter from './articletyperouter';
import tagRouter from './tagrouter';
import userRouter from './userrouter';
import accountRouter from './accountrouter';
import commentRouter from './commentrouter';

import comRouter from './comrouter.js';

import systemLogRouter from './systemlogrouter.js';

export default [
	testRouter,
	articleRouter,
    articleTypeRouter,
    tagRouter,
    userRouter,
    accountRouter,
    commentRouter,
    comRouter,
    systemLogRouter,
]