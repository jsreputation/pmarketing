import { Injectable } from '@angular/core';
import { countryCodes } from './country-code';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralStaticDataService {

  public getCountriesList(): Observable<any> {
    return of(countryCodes);
  }

}
