// xpioneer

import routes from '../routes';

const Routes = App => {
  routes.forEach(router => App.use(router.routes()) );
};

export default Routes;
