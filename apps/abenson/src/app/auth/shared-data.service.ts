import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface SharedData {
  [key: string]: string;
}
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private $data: BehaviorSubject<SharedData> = new BehaviorSubject({});

  public get storedData(): BehaviorSubject<SharedData> {
    return this.$data;
  }

  public setData(object: SharedData): void {
    this.$data.next(object);
  }
}
