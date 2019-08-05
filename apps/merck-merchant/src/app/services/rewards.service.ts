import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IReward {
  name: string;
  description: string;
  imageUrl: string;
  pointsPerUnit: number;
  quantity?: number;
}

export interface IGift {
  name: string;
  pointsPerUnit: number;
}

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  public getRewards(): Observable<IReward[]> {
    return of([
      {
        name: 'Glucophage XR Tab',
        description: '1000mg 60\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
      },
      {
        name: 'Glucophage XR Tab',
        description: '500mg 60\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
      },
      {
        name: 'Glucophage XR Tab',
        description: '750mg 30\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
      },
      {
        name: 'Glucovance Tab',
        description: '2.5mg 30\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
      },
      {
        name: 'Glucovance Tab',
        description: '5mg 30\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
      },
      {
        name: 'Concor Tab',
        description: '2.5mg 30\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
      },
      {
        name: 'Concor Tab',
        description: '5mg 100\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
      }
    ]);
  }

  public getReward(): Observable<IGift> {
    return of({
      name: 'Glucophage 10% Discount',
      pointsPerUnit: 5,
    });
  }
}
