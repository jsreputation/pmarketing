import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject, combineLatest } from 'rxjs';

export class ClientSideDataSource<T> extends MatTableDataSource<T> {
  public data$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public prepaginatedata$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public filtersState$: BehaviorSubject<any> = new BehaviorSubject<any>({
    filters: null
  });
  public sortState$: BehaviorSubject<any> = new BehaviorSubject<any>({
    sort: null
  });
  public paginatorState$: BehaviorSubject<any> = new BehaviorSubject<any>({
    paginator: null
  });
  public addDeleteData$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(
    this.initData
  );

  constructor(public initData: any) {
    super();
    this.data$.next(this.initData);
  }

  connect(): BehaviorSubject<T[]> {
    const displayDataChanges = [
      this.filtersState$,
      this.sortState$,
      this.paginatorState$,
      this.addDeleteData$
    ];

    combineLatest(...displayDataChanges).subscribe(
      ([filtersState, sortState, paginatorState]) => {
        let data = this.initData.slice();
        if (filtersState.filters) {
          data = this.dataMultiFilter(data, filtersState.filters);
        }
        if (sortState.sort) {
          data = this.dataSort(data, sortState.sort);
        }
        this.prepaginatedata$.next(data.slice());
        if (paginatorState.paginator) {
          data = this.dataPaginator(data, paginatorState.paginator);
        }
        this.data$.next(data);
      }
    );
    return this.data$;
  }

  disconnect() {
  }

  public applySort(sortInfo) {
    this.sortState$.next({ sort: sortInfo });
  }

  public applyPaginator(paginatorInfo) {
    this.paginatorState$.next({ paginator: paginatorInfo });
  }

  public applyDeleted(id: string) {
    this.initData = this.initData.filter((item) => item.id !== id);
    this.addDeleteData$.next(this.initData);
  }

  public applyAddItems(data: any) {
    this.initData = this.initData.concat(data);
    this.addDeleteData$.next(this.initData);
  }

  // TODO typings
  private dataMultiFilter(data: any[], filters: any): any[] {
    const filterKeys = Object.keys(filters);
    return data.filter((item) => {
      return filterKeys.every((key) => {
        return item[key].match(filters[key]);
      });
    });
  }

  // Todo typings
  public dataSort(data: any[], sortData: any): any[] {
    if (!sortData.active || sortData.direction === '') {
      return data;
    }
    return data.sort((valueA, valueB) => {
      return (
        (valueA[sortData.active] < valueB[sortData.active] ? -1 : 1) *
        (sortData.direction === 'asc' ? 1 : -1)
      );
    });
  }

  public dataPaginator(data: any[], paginatorData: any): any[] {
    const startIndex = paginatorData.pageIndex * paginatorData.pageSize;
    return data.splice(startIndex, paginatorData.pageSize);
  }
}
