import { BehaviorSubject, Observable } from 'rxjs';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { HttpParams } from '@angular/common/http';
import { SortModel } from '@cl-shared/table/data-source/sort.model';

// tslint:disable
export class CustomDataSource {
  private dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // used for toggle spiner loading
  public loading$ = this.loadingSubject.asObservable();
  private changeFilterSearch = new BehaviorSubject<number>(0);
  // used for setUp pagination index page to 0 when searching
  public changeSearch$ = this.changeFilterSearch.asObservable();
  private lengthData = new BehaviorSubject<number>(0);
  // used for set all length items the pagination component
  public length$ = this.lengthData.asObservable();

  // default items on the page set up pageSize
  constructor(private dataService: ITableService, private pageSize = 5) {
    this.loadingData();
  }

  private _sort: any;

  public get sort(): SortModel {
    return this._sort;
  }

  public set sort(val: SortModel) {
    this._sort = val;
    this.changeFilterSearch.next(0);
    this.loadingData();
  }

  private _filter: any;

  public get filter(): {[key: string]: string} {
    return this._filter;
  }

  public set filter(value: {[key: string]: string}) {
    this._filter = JSON.parse((value as any));
    this.changeFilterSearch.next(0);

    this.loadingData();
  }

  public set pagination(value: any) {
    this.pageSize = value.pageSize;
    this.loadingData(value);
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
    const params = {
      ...this.prepareFilters(),
      ...this.sortPrepare(this.sort),
      'page[number]': pagination ? pagination.pageIndex + 1 : 1,
      'page[size]': pagination ? pagination.pageSize : this.pageSize
    };
    this.loadingSubject.next(true);
    this.dataService.getTableData({params: this.params(params)})
      .subscribe((res: any) => {
        // console.log(res);
        this.dataSubject.next(res);

        // add random mock parameter
        this.lengthData.next(50);
        this.loadingSubject.next(false);
      }, error => {
        this.dataSubject.next([]);
        this.lengthData.next(0);
        this.loadingSubject.next(false);
        console.warn('error', error);
      });
  }

  public params(filters): HttpParams {
    if (filters) {
      let params: any = new HttpParams();
      for (const property in filters) {
        if (filters.hasOwnProperty(property) && (filters[property] !== null && filters[property] !== '' && filters[property] !== undefined)) {
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

  private sortPrepare(sortData: SortModel) {
    if (sortData && sortData.direction !== '') {
      const sort = sortData.direction === 'asc'
        ? `${sortData.active}`
        : `-${sortData.active}`;
      return {
        sort
      };
    }
    return {sort: null};
  }

  private prepareFilters(): any {
    if (!this._filter) {
      return {filter: null};
    }
    const result = {};
    Object.keys(this._filter)
      .forEach((item) => {
        result[`filter[${item}]`] = this.filter[item]
      });
    return result;
  }

}