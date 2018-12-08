import { Injectable } from '@angular/core';
import {AppService} from '../base/app.service';
import {ApiRequestOptions} from '../../models/ServiceModel/ApiRequestOptions';
import {Response} from '../../models/ServiceModel/Response';
import {EmployeeRequest} from '../../models/DataModel/DataRequestModel/EmployeeRequest';
import {Filter} from '../../models/ViewModel/Filter';
import {Employee} from '../../models/DataModel/Employee';


@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  public authApiRequest: ApiRequestOptions = new ApiRequestOptions();
  public employee: Employee = new Employee();
  public apiEndPointBase = '/skills';

  constructor(
      private _appService: AppService,
  ) {

  }

    public getAllQualifications(page: number, filter: Filter) {
        const endpoint = this.apiEndPointBase + '?page=' + page + '&orderBy=' + filter.orderBy + '&sort=' + filter.sort
                            + '&XDEBUG_SESSION=PHPSTORM';
        return this._appService.get<Response>(endpoint, this.authApiRequest);
    }


    public addQualification(employee: EmployeeRequest) {
        const endpoint = this.apiEndPointBase + '?XDEBUG_SESSION=PHPSTORM';
        return this._appService.post<Response>(endpoint, employee, this.authApiRequest);
    }
    public updateQualification(employee: any, id) {

        const endpoint = this.apiEndPointBase + '/' + id + '?XDEBUG_SESSION_START=PHPSTORM';
        return this._appService.post<Response>(endpoint, employee);
    }

    public deleteQualification(id) {
        const endpoint = this.apiEndPointBase + '/' + id + '?XDEBUG_SESSION=PHPSTORM';
        return this._appService.delete<Response>(endpoint);
    }


}
