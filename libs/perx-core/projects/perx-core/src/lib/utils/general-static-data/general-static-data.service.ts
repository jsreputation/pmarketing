import { Injectable } from '@angular/core';
import { countryCodes, ICountryCode } from './country-code';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralStaticDataService {

  public getCountriesList(countries?: string[]): Observable<ICountryCode[]> {
    if (!countries || !countries.length) {
      return of(countryCodes);
    }
    return of(countryCodes.filter(code => countries.includes(code.name)));
  }
}
