import { Injectable } from '@angular/core';
import { countryCodes, ICountryCode } from './country-code';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralStaticDataService {

  public static getImageCors(src: string| undefined): HTMLImageElement {
    const res = new Image();
    res.setAttribute('crossOrigin', 'Anonymous');
    res.src = src ? `${src}?v=${new Date().getTime()}` : '';
    res.crossOrigin = 'Anonymous';
    return res;
  }

  public getCountriesList(countries?: string[]): Observable<ICountryCode[]> {
    if (!countries || !countries.length) {
      return of(countryCodes);
    }
    return of(countryCodes.filter(code => countries.includes(code.name)));
  }

}
