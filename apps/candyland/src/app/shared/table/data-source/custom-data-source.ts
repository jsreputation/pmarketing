import { BehaviorSubject, Observable } from 'rxjs';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { SortModel } from '@cl-shared/table/data-source/sort.model';
import { HttpParamsService } from '@cl-core/services/http-params.service';

// tslint:disable
export class CustomDataSource<T> {
  private dataSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // used for toggle spiner loading
  public loading$ = this.loadingSubject.asObservable();
  private changeFilterSearch = new BehaviorSubject<number>(0);
  // used for setUp pagination index page to 0 when searching
  public changeSearch$ = this.changeFilterSearch.asObservable();
  private lengthData = new BehaviorSubject<number>(0);
  // used for set all length items the pagination component
  public length$ = this.lengthData.asObservable();
  // use for set included params
  private _included: string;

  public set included(value: any) {
    this._included = value;
  }

  public get included() {
    return { include: this._included };
  }

  // default items on the page set up pageSize
  constructor(public dataService: ITableService, public pageSize = 5) {
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
    const filter = JSON.parse((value as any));
    this._filter = filter;
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
      ...this.included,
      'page[number]': pagination ? pagination.pageIndex + 1 : 1,
      'page[size]': pagination ? pagination.pageSize : this.pageSize,
    };
    this.loadingSubject.next(true);
    this.dataService.getTableData( HttpParamsService.createHttpParams(params))
      .subscribe((res: any) => {
        this.dataSubject.next(res.data);

        // add random mock parameter
        this.lengthData.next(res.meta.page_count);
        this.loadingSubject.next(false);
      }, error => {
        this.dataSubject.next([]);
        this.lengthData.next(0);
        this.loadingSubject.next(false);
        console.warn('error', error);
      });
  }

  public updateData(): void {
    this.loadingData({pageIndex: 0})
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
