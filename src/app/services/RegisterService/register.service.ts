import { Injectable } from '@angular/core';
import {AppService} from '../base/app.service';
import {ApiRequestOptions} from '../../models/ServiceModel/ApiRequestOptions';
import {AccessLevel} from '../../models/ServiceModel/AccessLevel';
import {User} from '../../models/DataModel/User';
import {Response} from '../../models/ServiceModel/Response';
import {EmployeeRequest} from '../../models/DataModel/DataRequestModel/EmployeeRequest';
import {ClientRequest} from '../../models/DataModel/DataRequestModel/ClientRequest';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public authApiRequest: ApiRequestOptions;
  constructor(
      private _appService: AppService,
  ) { }

    public userRegister(user: User) {
        const endpoint = '/users?XDEBUG_SESSION=PHPSTORM';
        return this._appService.post<Response>(endpoint, user, this.authApiRequest);
    }

    public employeeRegister(employee: EmployeeRequest) {
        const endpoint = '/employees';
        return this._appService.post<Response>(endpoint, JSON.stringify(employee), this.authApiRequest);
    }
    public clientRegister(client: ClientRequest) {
        const endpoint = '/clients';
        return this._appService.post<Response>(endpoint, client, this.authApiRequest);
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
