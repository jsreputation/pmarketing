import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const vouchers = [
  { 
    id: 1,
    state: 'issued',
    name: 'Venti Caffe Latte',
    img: 'https://picsum.photos/200',
    description: 'Starbucks',
    expiresAt: '04 Feb 2019'
  },
  {
    id: 2,
    state: 'issued',
    name: '100g Cookies',
    img: 'https://picsum.photos/200',
    description: 'Famous Amos',
    expiresAt: '04 Feb 2019'
  },
  {
    id: 3,
    state: 'issued',
    name: '100g Cookies',
    img: 'https://picsum.photos/200',
    description: 'Famous Amos',
    expiresAt: '04 Feb 2019'
  },
  {
    id: 4,
    state: 'redeemed',
    name: '100g Cookies',
    img: 'https://picsum.photos/200',
    description: 'Famous Amos',
    expiresAt: '04 Feb 2019'
  },
  {
    id: 5,
    state: 'redeemed',
    name: '100g Cookies',
    img: 'https://picsum.photos/200',
    description: 'Famous Amos',
    expiresAt: '04 Feb 2019'
  }
];

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor() { }

  getAll(): Observable<{ id: number, state: string, name: string, img: string, description: string, expiresAt: string }[]> {
    return of(vouchers);
  }
}
