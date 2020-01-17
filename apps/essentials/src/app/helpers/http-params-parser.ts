import { HttpParams } from '@angular/common/http';

export class HttpParamsParser {

  public static createHttpParams(filters: any): HttpParams {
    // if (filters) {
    let params: HttpParams = new HttpParams();
    for (const property in filters) {
      if (filters.hasOwnProperty(property) &&
        (filters[property] !== null &&
          filters[property] !== '' &&
          filters[property] !== undefined)) {
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
    // }
  }
}
