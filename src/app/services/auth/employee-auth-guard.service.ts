import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class EmployeeAuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(): boolean {
        if (this.auth.isAuthenticated() && this.auth.isEmployee()) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
}
