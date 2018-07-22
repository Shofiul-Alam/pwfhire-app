import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRoute} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginRegisterGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router, public route: ActivatedRoute) {}
    canActivate(): boolean {
        if (this.auth.isAuthenticated() && (this.auth.isEmployee() || this.auth.isClient() || this.auth.isAdmin())) {
            const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            this.afterLoginRedirect(returnUrl);
            return false;
        }
        return true;
    }

    afterLoginRedirect(returnUrl) {
        if (this.auth.isAdmin()) {
            this.router.navigate([returnUrl || '/dashboard']);
        }
        if (this.auth.isEmployee()) {
            this.router.navigate([returnUrl || '/employee']);
        }
        if (this.auth.isClient()) {
            this.router.navigate([returnUrl || '/client/profile']);
        }
    }
}
