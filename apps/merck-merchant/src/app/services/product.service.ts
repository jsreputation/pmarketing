import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IProduct {
  name: string;
  description: string;
  imageUrl: string;
  pointsPerUnit: number;
  quantity?: number;
  price: number;
  currency: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public getProducts(): Observable<IProduct[]> {
    return of([
      {
        name: 'Glucophage XR Tab',
        description: '1000mg 60\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
        price: 100,
        currency: 'HKD',
      },
      {
        name: 'Glucophage XR Tab',
        description: '500mg 60\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
        price: 50,
        currency: 'HKD',
      },
      {
        name: 'Glucophage XR Tab',
        description: '750mg 30\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
        price: 75,
        currency: 'HKD',
      },
      {
        name: 'Glucovance Tab',
        description: '2.5mg 30\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
        price: 50,
        currency: 'HKD',
      },
      {
        name: 'Glucovance Tab',
        description: '5mg 30\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
        price: 100,
        currency: 'HKD',
      },
      {
        name: 'Concor Tab',
        description: '2.5mg 30\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
        price: 50,
        currency: 'HKD',
      },
      {
        name: 'Concor Tab',
        description: '5mg 100\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
        price: 100,
        currency: 'HKD',
      }
    ]);
  }
}
