import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const vouchers = [
  { id: 1, name: 'Starbucks' },
  { id: 2, name: 'Famous Amos' }
];

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor() { }

  getAll(): Observable<{ id: number, name: string }[]> {
    return of(vouchers);
  }
}
