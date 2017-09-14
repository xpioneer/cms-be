import Cors from './cors'
import Request from './request'
import Response from './response'
import Catch from './catch'
import Authorize from './authorize'

import Routes from './routes'

const Middlewares = App => {
  
    App.use(Catch);
    // App.use(Cors);
    App.use(Request);
    App.use(Response);
    App.use(Authorize);

    Routes(App);//inject routes
}

export default Middlewares