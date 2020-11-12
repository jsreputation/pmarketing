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
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images/rsz_glucophage_xr_1000_front.png',
        pointsPerUnit: 1200,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Glucophage XR Tab',
        description: '500mg 60\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images/rsz_glucophage_xr_500_front.png',
        pointsPerUnit: 600,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Glucophage XR Tab',
        description: '750mg 30\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images/rsz_glucophage_xr_750_front.png',
        pointsPerUnit: 450,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Glucovance',
        description: '5mg 30\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images/rsz_glucophage_xr_750_front.png',
        pointsPerUnit: 250,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Concor Tab',
        description: '2.5mg 30\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images/rsz_1concor_25_hi.jpg',
        pointsPerUnit: 350,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Concor Tab',
        description: '5mg 100\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images/rsz_concor_5_hi.jpg',
        pointsPerUnit: 1000,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Lodoz',
        description: '2.5mg 100\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images/Lodoz_2.5_6.25.jpg',
        pointsPerUnit: 1200,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Lodoz',
        description: '5mg 100\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images/Lodoz_5_6.25.jpg',
        pointsPerUnit: 1200,
        price: 0,
        currency: 'HKD',
      }
    ]);
  }
}
