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
export class InductionDocumentService {

  public authApiRequest: ApiRequestOptions = new ApiRequestOptions();
  public employee: Employee = new Employee();
  public apiEndPointBase = '/employee-inductions';

  constructor(
      private _appService: AppService,
  ) {

  }

    public getAllQualifications(page: number, filter: Filter) {
        const endpoint = this.apiEndPointBase + '?page=' + page + '&orderBy=' + filter.orderBy + '&sort=' + filter.sort
                            + '&XDEBUG_SESSION=PHPSTORM';
        return this._appService.get<Response>(endpoint, this.authApiRequest);
    }

    public getEmployeeInductions(page: number, filter: Filter, id: any) {
        const endpoint = this.apiEndPointBase + '/list-by/employee' + '?page=' + page + '&orderBy=' + filter.orderBy +
            '&sort=' + filter.sort + '&employee=' + id + '&XDEBUG_SESSION_START=PHPSTORM';
        return this._appService.get<Response>(endpoint, this.authApiRequest);
    }

    public addEmployeeDocument(document: any) {
        const endpoint = this.apiEndPointBase + '?XDEBUG_SESSION=PHPSTORM';
        return this._appService.post<Response>(endpoint, document, this.authApiRequest);
    }
    public updateEmployeeDocument(document: any, id) {

        const endpoint = this.apiEndPointBase + '/' + id + '?XDEBUG_SESSION_START=PHPSTORM';
        return this._appService.post<Response>(endpoint, document);
    }

    public deleteEmployeeDocument(id) {
        const endpoint = this.apiEndPointBase + '/' + id + '?XDEBUG_SESSION=PHPSTORM';
        return this._appService.delete<Response>(endpoint);
    }


}
