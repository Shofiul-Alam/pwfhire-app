import { Injectable } from '@angular/core';
import {AppService} from './base/app.service';
import {AuthRequest} from '../models/AuthRequest';
import {AuthResponse} from '../models/AuthResponse';
import {ApiRequestOptions} from '../models/ServiceModel/ApiRequestOptions';
import {AccessLevel} from '../models/ServiceModel/AccessLevel';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public authRequest: AuthRequest = new AuthRequest();
  public authApiRequest: ApiRequestOptions;
  constructor(
      private _appService: AppService,
  ) { }

    public login(authRequest: AuthRequest) {
        const endpoint = '/oauth/token';
        Object.assign(this.authRequest, authRequest);
        return this._appService.post<AuthResponse>(endpoint, this.authRequest, this.authApiRequest);
    }
    public accessLevel() {
        const endpoint = '/user/access-level';
        return this._appService.get<AccessLevel>(endpoint);
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('machine_access_token');
        localStorage.removeItem(atob('access_level'));

        window.location.href = '/login';
    }
}
