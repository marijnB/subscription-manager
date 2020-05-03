import { LoginComponent } from './login/login.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { UserRouteActivator } from './user-route-activator.service';

export const userRoutes = [
    { path: '', component: LoginComponent, canActivate: [UserRouteActivator] },
    { path: 'subscribers', component: SubscribersComponent, canActivate: [UserRouteActivator] }
]