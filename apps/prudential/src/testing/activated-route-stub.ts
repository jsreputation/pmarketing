import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject: ReplaySubject<ParamMap> = new ReplaySubject<ParamMap>();
  /** The mock paramMap observable */
  public readonly paramMap: Observable<ParamMap>;

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
    this.paramMap = this.subject.asObservable();
  }

  /** Set the paramMap observables's next value */
  public setParamMap(params?: Params): void {
    this.subject.next(convertToParamMap(params));
  }
}
