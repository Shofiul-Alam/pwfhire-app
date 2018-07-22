import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ApiRequestOptions} from '../../models/ServiceModel/ApiRequestOptions';
import {HttpHeaderProperty} from '../../models/ServiceModel/HttpHeaderProperty';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private serverURL = 'http://pwfhire.pb';
  private clientToken = '';
  private accessToken = '';
  private headerArr: Array<HttpHeaderProperty> = [
                                            new HttpHeaderProperty('Accept', 'application/json'),
                                            new HttpHeaderProperty('Content-type', 'application/json'),
                                        ];
  private apiRequestOptions: ApiRequestOptions = new ApiRequestOptions(this.headerArr);

  constructor(private http: HttpClient) {
      this.tokenFormation();
  }
  tokenFormation() {
      this.clientToken = localStorage.getItem('machine_access_token');
      this.accessToken = localStorage.getItem('access_token');
      if (this.accessToken) {
          this.apiRequestOptions.headers = this.setHeaders(this.accessToken);
      } else if (this.clientToken) {
          this.apiRequestOptions.headers = this.setHeaders(this.clientToken);
      }
  }
  setHeaders(token) {
      const bearer = 'Bearer ' + token;
      return this.apiRequestOptions.prepareHeaders('Authorization', bearer);
  }
    /**
     * URL builder getUrl method
     */
    getUrl (endpoint: string): string {
      return this.serverURL + endpoint;
    }

    /**
     * Performs a request with `get` http method.
     */
    get<T>(endpoint: string, options?: ApiRequestOptions): Observable<HttpResponse<T>> {
        this.tokenFormation();

        const url = this.getUrl(endpoint);

        const op = this.apiRequestOptions;

        return this.http.get<T>(url, op);
    }

    /**
     * Performs a request with `get` http method.
     */
    getAssets<T>(endpoint: string, options?: ApiRequestOptions): Observable<HttpResponse<T>> {
        return this.http.get<T>(endpoint, options);
    }
    /**
     * Performs a request with `post` http method.
     */
    post<T>(endpoint: string, objectParams: any, options?: ApiRequestOptions): Observable<HttpResponse<T>> {
        this.tokenFormation();

        const url = this.getUrl(endpoint);

        const op = this.apiRequestOptions;

        return this.http.post<T>(url, objectParams, op);
    }
    /**
     * Performs a request with `put` http method.
     */
    put<T>(endpoint: string, objectParams: any, options?: ApiRequestOptions): Observable<HttpResponse<T>> {
        this.tokenFormation();

        const url = this.getUrl(endpoint);

        const op = this.apiRequestOptions;

        return this.http.put<T>(url, objectParams, op);
    }
    /**
     * Performs a request with `delete` http method.
     */
    delete<T>(endpoint: string, options?: ApiRequestOptions): Observable<HttpResponse<T>> {
        this.tokenFormation();

        const url = this.getUrl(endpoint);

        const op = this.apiRequestOptions;

        return this.http.delete<T>(url, op);
    }
}
