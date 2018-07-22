import { Injectable } from '@angular/core';
import {AppService} from '../base/app.service';
import {ApiRequestOptions} from '../../models/ServiceModel/ApiRequestOptions';
import {Response} from '../../models/ServiceModel/Response';
import {UserRequest} from '../../models/DataModel/DataRequestModel/UserRequest';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public authApiRequest: ApiRequestOptions;
  constructor(
      private _appService: AppService,
  ) { }


    public addUser(user: UserRequest) {
        const endpoint = '/users?XDEBUG_SESSION=PHPSTORM';
        return this._appService.post<Response>(endpoint, user, this.authApiRequest);
    }
    public updateUser(user: UserRequest) {
        const endpoint = '/users/' + user.identifier + '?XDEBUG_SESSION=PHPSTORM';
        return this._appService.put<Response>(endpoint, user, this.authApiRequest);
    }
    public deleteUser(id) {
        const endpoint = '/users/' + id + '?XDEBUG_SESSION=PHPSTORM';
        return this._appService.delete<Response>(endpoint);
    }

}
