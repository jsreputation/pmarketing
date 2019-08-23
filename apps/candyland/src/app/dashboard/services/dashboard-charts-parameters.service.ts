import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DashboardChartsParametersService {
  private _params$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public get params$(): Observable<any> {
    return this._params$.asObservable();
  }

  public get params(): any {
    return this._params$.value;
  }

  public set params(newParams: any) {
    console.log('set', newParams);
    this._params$.next(newParams);
  }
}
