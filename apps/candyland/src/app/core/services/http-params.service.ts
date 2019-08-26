import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpParamsService {

  public static createHttpParams(filters): HttpParams {
    if (filters) {
      let params: any = new HttpParams();
      for (const property in filters) {
        if (filters.hasOwnProperty(property) && (filters[property] !== null && filters[property] !== '' && filters[property] !== undefined)) {
          if (Array.isArray(property)) {
            filters[property].forEach((element) => {
              params = params.append(property, element);
            });
          } else {
            params = params.append(property, filters[property]);
          }
        }
      }
      return params;
    }
  }
}
