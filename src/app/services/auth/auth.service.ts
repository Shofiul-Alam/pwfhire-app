// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from '../base/app.service';
import { AuthResponse } from '../../models/AuthResponse';
import { AuthRequest } from '../../models/AuthRequest';
import {ApiRequestOptions} from '../../models/ServiceModel/ApiRequestOptions';


@Injectable()
export class AuthService {
    public authRequest = new AuthRequest();
    public authApiRequest: ApiRequestOptions;
    constructor(public jwtHelper: JwtHelperService,
                protected _appService: AppService,
    ) {}
    // ...
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
    }
    // ...
    public isAuthenticatedMachine(): boolean {
        const token = localStorage.getItem('machine_access_token');
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
    }
    /**
     * getAuthToken Method will be used to store authentication token into local storage
     */
    public getClientToken(authRequest: AuthRequest) {
        const endpoint = '/oauth/token';
        Object.assign(this.authRequest, authRequest);
        const res = this._appService.post<AuthResponse>(endpoint, this.authRequest, this.authApiRequest);
        return res;
    }

    public isAdmin(): boolean {
        const access_level = btoa('access_level');
        const token = localStorage.getItem(access_level);
        return 'Admin' === atob(token);
    }

    public isEmployee(): boolean {
        const access_level = btoa('access_level');
        const token = localStorage.getItem(access_level);
        return 'Employee' === atob(token);
    }

    public isClient(): boolean {
        const access_level = btoa('access_level');
        const token = localStorage.getItem(access_level);
        return 'Client' === atob(token);
    }

    public getAccessLevel(): string {
        const access_level = btoa('access_level');
        const token = localStorage.getItem(access_level);
        let role: any;
        switch (atob(token)) {
            case 'Admin': role = 'admin'; break;
            case 'Client': role = 'client'; break;
            case 'Employee': role = 'employee'; break;
        }
        return role;
    }

    public logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('machine_access_token');
        localStorage.removeItem(btoa('access_level'));

        window.location.href = '/login';
    }
}
