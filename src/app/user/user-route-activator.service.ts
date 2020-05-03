import { Router, ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from './login/auth.service';

@Injectable()
export class UserRouteActivator implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot) {
        // Controle is page to visit = subscribers or login.
        if (route.routeConfig.path == 'subscribers') {
            // redirect if not logged in
            if (!this.authService.isLoggedIn()) {
                this.router.navigate(['/user'])
            }
            return true;
        }
        else {
            if (this.authService.isLoggedIn()) {
                // redirect from '/user'(login-page) to subscribers
                this.router.navigate(['user/subscribers']);
            }
            return true;
        }
    }
}