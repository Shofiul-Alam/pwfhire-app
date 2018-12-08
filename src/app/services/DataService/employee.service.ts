import { Injectable } from '@angular/core';
import {AppService} from '../base/app.service';
import {ApiRequestOptions} from '../../models/ServiceModel/ApiRequestOptions';
import {Response} from '../../models/ServiceModel/Response';
import {EmployeeRequest} from '../../models/DataModel/DataRequestModel/EmployeeRequest';
import {Filter} from '../../models/ViewModel/Filter';
import {Employee} from '../../models/DataModel/Employee';
import {HttpHeaderProperty} from '../../models/ServiceModel/HttpHeaderProperty';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public authApiRequest: ApiRequestOptions;
  public employee: Employee = new Employee();
  public url: string;

  constructor(
      private _appService: AppService,
  ) {
      this.url = _appService.serverURL;
  }

    public getAllEmployees(page: number, filter: Filter) {
        const endpoint = '/employees?page=' + page + '&orderBy=' + filter.orderBy + '&sort=' + filter.sort
                            + '&XDEBUG_SESSION=PHPSTORM';
        return this._appService.get<Response>(endpoint, this.authApiRequest);
    }

    public addEmployee(employee: EmployeeRequest) {
        const endpoint = '/employees?XDEBUG_SESSION=PHPSTORM';
        return this._appService.post<Response>(endpoint, employee, this.authApiRequest);
    }
    public updateEmployee(employee: any, id) {

        const endpoint = '/employees/' + id + '?XDEBUG_SESSION_START=PHPSTORM';
        return this._appService.post<Response>(endpoint, employee);
    }

    public quickUpdateEmployee(employee: any, id) {

        const endpoint = '/employees/' + id + '?XDEBUG_SESSION_START=PHPSTORM';
        return this._appService.put<Response>(endpoint, employee);
    }
    public deleteEmployee(id) {
        const endpoint = '/employees/' + id + '?XDEBUG_SESSION=PHPSTORM';
        return this._appService.delete<Response>(endpoint);
    }

    public approveEmployee(id, bool) {
        const endpoint = '/employee/approve?id=' + id + '&approval=' + bool + '&XDEBUG_SESSION=PHPSTORM';
        return this._appService.get<Response>(endpoint);
    }

}
