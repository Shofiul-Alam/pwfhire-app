import { Injectable } from '@angular/core';
import {AppService} from '../base/app.service';
import {ApiRequestOptions} from '../../models/ServiceModel/ApiRequestOptions';
import {Response} from '../../models/ServiceModel/Response';
import {Filter} from '../../models/ViewModel/Filter';
import {Employee} from '../../models/DataModel/Employee';


@Injectable({
  providedIn: 'root'
})
export class InductionService {

  public authApiRequest: ApiRequestOptions = new ApiRequestOptions();
  public employee: Employee = new Employee();
  public apiEndPointBase = '/inductions';

  constructor(
      private _appService: AppService,
  ) {

  }

    public getAllInductions(page: number, filter: Filter) {
        const endpoint = this.apiEndPointBase + '?page=' + page + '&orderBy=' + filter.orderBy + '&sort=' + filter.sort
                            + '&XDEBUG_SESSION=PHPSTORM';
        return this._appService.get<Response>(endpoint, this.authApiRequest);
    }


}
