import {HttpHeaders, HttpParams} from '@angular/common/http';
import {HttpHeaderProperty} from './HttpHeaderProperty';



export class ApiRequestOptions {
    public headers: HttpHeaders;
    public observe: 'response';
    public params?: HttpParams = new HttpParams();
    public reportProgress?: boolean;
    public responseType?: 'json';
    public withCredentials?: boolean;

/** HeaderConstructor **/

 constructor(customHeaders?: Array<HttpHeaderProperty>) {
     if (typeof customHeaders !== 'undefined') {
         const httpHeadersArr = Array<HttpHeaders>();
         httpHeadersArr[0] = new HttpHeaders();
         let i = 0;

         for (const property of customHeaders) {
             i++;
             httpHeadersArr[i] = httpHeadersArr[(i - 1)].set(property.name, property.value);
         }

         this.headers = httpHeadersArr[i];
    }

 }
 prepareHeaders (name: string, value: any): void {
     this.headers.set(name, value);
 }
}
