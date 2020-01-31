import { MatSort } from '@angular/material';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { IHttpParamsOptions } from 'projects/perx-candyshop/src/models/http-params-options.interface';
import { IApiTableData } from './models/api-table-data.interface';
import { IApiTableService } from './models/api-table-service.interface';
import { ApiTableSortModel } from './models/api-table-sort.model';
import { ITablePagination } from 'projects/perx-candyshop/src/lib/table-data-source/models/table-pagination.interface';
import { ApiDataSourceStates } from './models/api-data-source-states.enum';
import { ApiDataSourceUpdateSchema } from 'projects/perx-candyshop/src/lib/table-data-source/models/api-data-source-update-schema.enum';

export class ApiDataSource<T> extends DataSource<T> {
  private dataSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // used for toggle spinner loading
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();
  private changeFilterSearch: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // used for setUp pagination index page to 0 when searching
  public changeSearch$: Observable<number> = this.changeFilterSearch.asObservable();
  public state$: BehaviorSubject<ApiDataSourceStates> = new BehaviorSubject<ApiDataSourceStates>(ApiDataSourceStates.firstLoading);
  private lengthData: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // used for set all length items the pagination component
  public length$: Observable<number> = this.lengthData.asObservable();
  private pageIndex: number;

  public get length(): number {
    return this.lengthData.value;
  }

  // use for set included params
  private privateParams: IHttpParamsOptions;
  private destroy$: Subject<void> = new Subject();
  private request: Subscription;

  public set params(value: IHttpParamsOptions) {
    this.privateParams = value;
    this.loadingData();
  }

  public get params(): IHttpParamsOptions {
    return this.privateParams || {};
  }

  public get data(): T[] {
    return this.dataSubject.value;
  }

  public get data$(): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  public get state(): ApiDataSourceStates {
    return this.state$.value;
  }

  public get hasData$(): Observable<boolean> {
    return this.dataSubject.pipe(
      map(data => data.length > 0)
    );
  }

  // default items on the page set up pageSize
  constructor(public dataService: IApiTableService, public pageSize: number = 5, params?: IHttpParamsOptions) {
    super();
    if (params) {
      this.params = params;
    }
    this.updateData(ApiDataSourceUpdateSchema.firstPage);
  }

  private privateSort: ApiTableSortModel;

  public get sort(): ApiTableSortModel {
    return this.privateSort;
  }

  public set sort(val: ApiTableSortModel) {
    this.privateSort = val;
    this.changeFilterSearch.next(0);
    this.updateData(ApiDataSourceUpdateSchema.firstPage);
  }

  private privateFilter: any;

  public set filter(value: { [key: string]: string } | string) { // { [key: string]: string }
    if (typeof value === 'string') {
      this.privateFilter = JSON.parse((value));
    } else {
      this.privateFilter = value;
    }
    this.changeFilterSearch.next(0);
    this.updateData(ApiDataSourceUpdateSchema.firstPage);
  }

  public set pagination(value: ITablePagination) {
    if (this.pageSize !== value.pageSize) {
      this.pageSize = value.pageSize;
      this.changeFilterSearch.next(0);
    }
    if (this.pageIndex !== value.pageIndex) {
      this.pageIndex = value.pageIndex;
    }
    this.updateData(ApiDataSourceUpdateSchema.currentPage);
  }

  public connect(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  public disconnect(): void {
    this.request.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    this.dataSubject.complete();
    this.changeFilterSearch.complete();
    this.loadingSubject.complete();
    this.lengthData.complete();
  }

  public updateData(schema: ApiDataSourceUpdateSchema = ApiDataSourceUpdateSchema.firstPage): void {
    switch (schema) {
      case ApiDataSourceUpdateSchema.firstPage:
        this.pageIndex = 0;
        break;
      case ApiDataSourceUpdateSchema.currentPage:
        break;
    }
    this.loadingData();
  }

  public registerSort(sort: MatSort): void {
    if (!sort) {
      throw new Error('Sort is undefined');
    }
    sort.sortChange
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(newSort => this.sort = newSort);
  }

  private loadingData(): void {
    const pageNum = this.pageIndex + 1;
    const params: IHttpParamsOptions = {
      ...this.params,
      ...this.prepareFilters(),
      ...this.sortPrepare(this.sort),
      'page[number]': pageNum,
      'page[size]': this.pageSize
    };
    if (this.request) {
      this.request.unsubscribe();
    }
    this.loadingSubject.next(true);
    if (!isNaN(pageNum)) {
      this.request = this.dataService.getTableData(params)
        .subscribe(
          (res: IApiTableData<T>) => {
            this.dataSubject.next(res.data);
            this.lengthData.next(res.meta.record_count || 0);
            this.loadingSubject.next(false);
            const status = (res.data.length > 0 && 'record_count' in res.meta && res.meta.record_count && res.meta.record_count > 0) ? ApiDataSourceStates.hasDataApi : ApiDataSourceStates.noDataApi;
            this.setState(status);
          },
          () => {
            this.dataSubject.next([]);
            this.lengthData.next(0);
            this.loadingSubject.next(false);
            this.setState(ApiDataSourceStates.errorApi);
          }
        );
    }
  }

  private setState(state: ApiDataSourceStates): void {
    if (this.state$.value === ApiDataSourceStates.firstLoading || this.state$.value === ApiDataSourceStates.noDataApi) {
      this.state$.next(state);
    }
  }

  private sortPrepare(sortData: ApiTableSortModel): ApiTableSortModel | {} {
    if (sortData && sortData.direction !== '') {
      const sort = sortData.direction === 'asc' ? `${ sortData.active }` : `-${ sortData.active }`;
      return { sort };
    }
    return {};
  }

  private prepareFilters(): any {
    if (!this.privateFilter) {
      return {};
    }
    const result = {};
    Object.keys(this.privateFilter)
      .forEach((item) => {
        if (this.privateFilter[item]) {
          result[`filter[${ item }]`] = this.privateFilter[item];
        }
      });
    return result;
  }
}
