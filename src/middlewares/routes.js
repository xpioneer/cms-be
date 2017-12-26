// xpioneer

import routes from '../routes'//测试路由

const Routes = App => {
  	routes.forEach(router => App.use(router.routes()) )
}

export default Routes