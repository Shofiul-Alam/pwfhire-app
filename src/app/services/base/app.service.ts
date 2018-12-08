import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ApiRequestOptions} from '../../models/ServiceModel/ApiRequestOptions';
import {HttpHeaderProperty} from '../../models/ServiceModel/HttpHeaderProperty';
import {url} from '../../models/Global/Global';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  public serverURL = url;
  private clientToken = '';
  private accessToken = '';
  private headerArr: Array<HttpHeaderProperty> = [
                                            new HttpHeaderProperty('Accept', 'application/json'),
                                        ];
  private apiRequestOptions: ApiRequestOptions = new ApiRequestOptions(this.headerArr);

  constructor(private http: HttpClient) {
      this.tokenFormation();
  }
  tokenFormation() {
      this.clientToken = localStorage.getItem('machine_access_token');
      this.accessToken = localStorage.getItem('access_token');
      if (this.accessToken) {
          this.setHeaders('Authorization', this.accessToken);
      } else if (this.clientToken) {
          this.setHeaders('Authorization', this.clientToken);
      }
  }
  setHeaders(name: any, value: any) {
      if (name === 'Authorization') {
          const bearer = 'Bearer ' + value;
          this.apiRequestOptions.headers.delete(name);
          this.apiRequestOptions.prepareHeaders(name, bearer);
      } else {
          this.apiRequestOptions.headers.delete(name);
          this.apiRequestOptions.prepareHeaders(name, value);
      }
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

        const getUrl = this.getUrl(endpoint);

        if (typeof options !== 'undefined' && typeof options.headers !== 'undefined') {
            for (const key of options.headers.keys()) {
                this.setHeaders(key, options.headers.get(key));
            }
        }

        const op = this.apiRequestOptions;

        return this.http.get<T>(getUrl, op);
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

        const postUrl = this.getUrl(endpoint);

        if (typeof options !== 'undefined' && typeof options.headers !== 'undefined') {
            for (const key of options.headers.keys()) {
                this.setHeaders(key, options.headers.get(key));
            }
        }

        const op = this.apiRequestOptions;

        return this.http.post<T>(postUrl, objectParams, op);
    }
    /**
     * Performs a request with `put` http method.
     */
    put<T>(endpoint: string, objectParams: any, options?: ApiRequestOptions): Observable<HttpResponse<T>> {
        this.tokenFormation();

        const putUrl = this.getUrl(endpoint);

        if (typeof options !== 'undefined' && typeof options.headers !== 'undefined') {
            for (const key of options.headers.keys()) {
                this.setHeaders(key, options.headers.get(key));
            }
        }

        const op = this.apiRequestOptions;

        return this.http.put<T>(putUrl, objectParams, op);
    }
    /**
     * Performs a request with `delete` http method.
     */
    delete<T>(endpoint: string, options?: ApiRequestOptions): Observable<HttpResponse<T>> {
        this.tokenFormation();

        const deleteUrl = this.getUrl(endpoint);

        const op = this.apiRequestOptions;

        return this.http.delete<T>(deleteUrl, op);
    }
}
