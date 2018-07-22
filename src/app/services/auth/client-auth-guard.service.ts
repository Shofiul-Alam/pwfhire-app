import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ClientAuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(): boolean {
        if (this.auth.isAuthenticated() && this.auth.isClient()) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
}