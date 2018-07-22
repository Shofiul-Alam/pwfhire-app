import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(): boolean {
        if (this.auth.isAuthenticated() && this.auth.isAdmin()) {
            return true;
        }
        if (this.auth.isAuthenticated() && (this.auth.isEmployee() || this.auth.isClient())) {
            this.router.navigate(['unauthorized']);
            return false;
        }
        this.router.navigate(['login']);
        return false;
    }
}
