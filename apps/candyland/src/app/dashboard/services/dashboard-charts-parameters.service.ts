import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DashboardChartsParametersService {
  private paramsSubject$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public get params$(): Observable<any> {
    return this.paramsSubject$.asObservable();
  }

  public get params(): any {
    return this.paramsSubject$.value;
  }

  public set params(newParams: any) {
    this.paramsSubject$.next(newParams);
  }
}
