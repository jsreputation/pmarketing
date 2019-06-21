import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor() { }
  getPin(): Observable<string> {
    return of('1234');
  }
}
