// qinfeng

import routes from '../routes'//测试路由

const Routes = App => {

  	routes.forEach(router => App.use(router.routes()) )

  	// App.use(testRouter.routes())
}

export default Routes