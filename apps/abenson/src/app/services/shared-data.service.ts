import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private data$: BehaviorSubject<any>;

  constructor() {
    this.data$ = new BehaviorSubject(null);
  }

  public get data(): Observable<any> {
    return this.data$;
  }

  public addData(data: any): void {
    this.data$.next(data);
  }
}
