// import { Injectable } from '@angular/core';
// import {ApiRequestOptions} from '../../models/ApiRequestOptions';
// import {HttpHeaders, HttpParams} from '@angular/common/http';
//
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class FunctionService {
//
//   constructor() { }
//
//   prepareApiRequestOptions(options: ApiRequestOptions, params: ApiRequestOptions) {
//       options.headers = this.getHeaders(options.headers, params.headers);
//       options.params = this.getHttpParams(options.params, params.params);
//       options.responseType = params.responseType;
//       options.withCredentials = params.withCredentials;
//       options.observe = params.observe;
//       return options;
//   }
//
//   getHeaders(httpHeaders: HttpHeaders, array: Array<HttpHeaders>) {
//       for (item of array) {
//           httpHeaders.set(item[0], item[1]);
//       }
//       return httpHeaders;
//   }
//     getHttpParams(httpParams: HttpParams, array: Array<HttpParams>) {
//         for (item of array) {
//             httpParams.set(item[0], item[1]);
//         }
//         return httpParams;
//     }
// }
