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
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images-10-nov-2020/Glucophage+XR+1000mg.JPG',
        pointsPerUnit: 720,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Glucophage XR Tab',
        description: '500mg 60\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images-10-nov-2020/Glucophage+XR+500mg.JPG',
        pointsPerUnit: 360,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Glucophage XR Tab',
        description: '750mg 30\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images-10-nov-2020/Glucophage+XR+750mg.JPG',
        pointsPerUnit: 270,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Glucovance',
        description: '5mg 30\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images-10-nov-2020/Glucovance+5mg.JPG',
        pointsPerUnit: 150,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Concor Tab',
        description: '2.5mg 30\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images-10-nov-2020/Concor+2.5mg.JPG',
        pointsPerUnit: 260,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Concor Tab',
        description: '5mg 100\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images-10-nov-2020/Concor+5mg.JPG',
        pointsPerUnit: 800,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Lodoz',
        description: '2.5mg 100\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images-10-nov-2020/Lodoz+2.5mg.JPG',
        pointsPerUnit: 720,
        price: 0,
        currency: 'HKD',
      },
      {
        name: 'Lodoz',
        description: '5mg 100\'s',
        imageUrl: 'https://perx-cdn.s3-ap-southeast-1.amazonaws.com/content/merck/product-images-10-nov-2020/Lodoz+5mg.JPG',
        pointsPerUnit: 720,
        price: 0,
        currency: 'HKD',
      }
    ]);
  }
}
