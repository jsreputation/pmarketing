import { BehaviorSubject, Observable } from 'rxjs';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { HttpParams } from '@angular/common/http';
import { SortModel } from '@cl-shared/table/data-source/sort.model';

export enum SortDictionary {
  name = 'name',
  email = 'email',
  registration = 'registration_time',
  verification = 'email_verification_time',
  lastVisit = 'last_activity_time',
  membership = 'current_plan_name',
  membershipCost = 'current_plan_cost'
}
// tslint:disable
export class CustomDataSource {
  private dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private changeFilterSearch = new BehaviorSubject<number>(0);
  private lengthData = new BehaviorSubject<number>(0);
  private _sort: any;
  private _filter: any;

  // used for setUp pagination index page to 0 when searching
  public changeSearch$ = this.changeFilterSearch.asObservable();
  // used for toggle spiner loading
  public loading$ = this.loadingSubject.asObservable();
  // used for set all length items the pagination component
  public length$ = this.lengthData.asObservable();

  public get sort(): SortModel {
    return this._sort;
  }

  public set sort(val: SortModel) {
    this._sort = val;
    this.changeFilterSearch.next(0);

    this.loadingData();
  }

  public get filter() {
    return this._filter;
  }

  public set filter(value: string) {
    this._filter = value;
    this.changeFilterSearch.next(0);

    this.loadingData();
  }

  public set pagination(value: any) {
    this.pageSize = value.pageSize;
    this.loadingData(value);
  }

  // default items on the page set up pageSize
  constructor(private dataService: ITableService,
              private pageSize = 5) {
    this.loadingData();
  }

  public connect(): Observable<any> {
    return this.dataSubject.asObservable();
  }
  public disconnect(): void {
    this.dataSubject.complete();
    this.changeFilterSearch.complete();
    this.loadingSubject.complete();
    this.lengthData.complete();
  }


  loadingData(pagination?: any) {
    const dataFilter = {
      // filter: this.filter,
      'page[number]': pagination ? pagination.pageIndex + 1 : 1,
      'page[size]': pagination ? pagination.pageSize : this.pageSize,
      // ...this.sortPrepare(this.sort)
    };
    this.loadingSubject.next(true);
    this.dataService.getTableData({params: this.params(dataFilter)})
      .subscribe((res: any) => {
        this.dataSubject.next(res.users);
        this.lengthData.next(res.meta.totalCount);
        this.loadingSubject.next(false);
      }, error => {
        this.dataSubject.next([]);
        this.lengthData.next(0);
        this.loadingSubject.next(false);
        console.warn('error', error);
      });
  }

  private sortPrepare(sort: SortModel) {
    if (sort && sort.direction !== '') {
      return {
        order: SortDictionary[sort.active],
        sort: sort.direction
      };
    }
    return {sort: null};
  }

  public params(filters): HttpParams {
    if (filters) {
      let params: any = new HttpParams();
      for (const property in filters) {
        if (
          filters.hasOwnProperty(property) &&
          (filters[property] !== null && filters[property] !== '' && filters[property] !== undefined )
        ) {
          if (Array.isArray(property)) {
            filters[property].forEach((element) => {
              params = params.append(property, element);
            });
          } else {
            params = params.append(property, filters[property]);
          }
        }
      }
      return params;
    }
  }
}
