import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class StepConditionService {
  private stepConditions$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public registerStepCondition(key: number | string, value: boolean): void {
    const conditions = this.stepConditions$.value;
    conditions[key] = value;
    this.stepConditions$.next(conditions);
  }

  public stepCondition$(key: number | string): Observable<boolean> {
    return this.stepConditions$.asObservable().pipe(
      map(conditions => conditions && key in conditions && conditions[key]),
      distinctUntilChanged()
    );
  }
}
