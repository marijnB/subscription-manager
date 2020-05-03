import {Routes} from '@angular/router';

import {HomepageComponent} from './homepage/homepage.component';
import { Error404Component } from './errors/404.component';

export const appRoutes: Routes = [
    {path : '', component: HomepageComponent}, 
    // since new version : module loading works with promise i.s.o. via lazyloading (string)
    {path : 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
    {path: '**', component: Error404Component}

]
