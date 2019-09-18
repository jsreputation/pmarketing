import { Injectable } from '@angular/core';
import { countryCodes, ICountryCode } from './country-code';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralStaticDataService {

  public getCountriesList(): Observable<ICountryCode[]> {
    return of(countryCodes);
  }

}
