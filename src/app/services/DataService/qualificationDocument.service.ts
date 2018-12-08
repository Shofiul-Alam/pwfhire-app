import { Injectable } from '@angular/core';
import {AppService} from '../base/app.service';
import {ApiRequestOptions} from '../../models/ServiceModel/ApiRequestOptions';
import {Response} from '../../models/ServiceModel/Response';
import {EmployeeRequest} from '../../models/DataModel/DataRequestModel/EmployeeRequest';
import {Filter} from '../../models/ViewModel/Filter';
import {Employee} from '../../models/DataModel/Employee';
import {QualificationRequest} from '../../models/DataModel/DataRequestModel/QualificationRequest';
import {HttpHeaderProperty} from '../../models/ServiceModel/HttpHeaderProperty';


@Injectable({
  providedIn: 'root'
})
export class QualificationDocumentService {

  public authApiRequest: ApiRequestOptions = new ApiRequestOptions();
  public employee: Employee = new Employee();
  public apiEndPointBase = '/qualifications';

  constructor(
      private _appService: AppService,
  ) {

  }

    public getAllQualifications(page: number, filter: Filter) {
        const endpoint = this.apiEndPointBase + '?page=' + page + '&orderBy=' + filter.orderBy + '&sort=' + filter.sort
                            + '&XDEBUG_SESSION=PHPSTORM';
        return this._appService.get<Response>(endpoint, this.authApiRequest);
    }

    public getQualificationsByEmployee(page: number, filter: Filter, id: any) {
        const endpoint = this.apiEndPointBase + '/list-by/employee' + '?page=' + page + '&orderBy=' + filter.orderBy +
            '&sort=' + filter.sort + '&employee=' + id + '&XDEBUG_SESSION_START=PHPSTORM';
        return this._appService.get<Response>(endpoint, this.authApiRequest);
    }

    public addQualification(qualificationDocument: any) {
        const endpoint = this.apiEndPointBase + '?XDEBUG_SESSION=PHPSTORM';
        return this._appService.post<Response>(endpoint, qualificationDocument, this.authApiRequest);
    }
    public updateQualification(qualificationDocument: any, id) {

        const endpoint = this.apiEndPointBase + '/' + id + '?XDEBUG_SESSION_START=PHPSTORM';
        return this._appService.post<Response>(endpoint, qualificationDocument);
    }

    public deleteQualification(id) {
        const endpoint = this.apiEndPointBase + '/' + id + '?XDEBUG_SESSION=PHPSTORM';
        return this._appService.delete<Response>(endpoint);
    }


}
