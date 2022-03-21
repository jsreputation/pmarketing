import { Injectable } from '@angular/core';
import { IFilterModel } from '../models/filter.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public filterValue$: Subject<IFilterModel> = new Subject<IFilterModel>();
  public currentValue: IFilterModel;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public setValue(filterValue: IFilterModel) {
    console.log('FilterService filterValue: ', filterValue);
    this.currentValue = filterValue;
    this.filterValue$.next(filterValue);
  }
}
