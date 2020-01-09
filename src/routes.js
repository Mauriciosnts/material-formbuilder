import * as ROUTES from './constants/routes';

import Home from './containers/home';

export const routes = [
    { path:ROUTES.HOME, component:Home, exact:true, useAuth:true},
]