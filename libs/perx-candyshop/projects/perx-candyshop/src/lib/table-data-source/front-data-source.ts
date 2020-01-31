import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { IFrontTableSort } from './models/front-table-sort.interface';
import { ITablePagination } from './models/table-pagination.interface';


export class FrontDataSource<T> extends MatTableDataSource<T> {
  public data$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public paginateData$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public filtersState$: BehaviorSubject<{ filters: any | null }> = new BehaviorSubject<{ filters: any | null }>({
    filters: null
  });
  public sortState$: BehaviorSubject<{ sort: IFrontTableSort | null }> = new BehaviorSubject<{ sort: IFrontTableSort | null }>({
    sort: null
  });
  public paginatorState$: BehaviorSubject<{ paginator: ITablePagination | null }> = new BehaviorSubject<{ paginator: ITablePagination | null }>({
    paginator: null
  });
  public addDeleteData$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(
    this.initData
  );

  constructor(public initData: T[]) {
    super();
    this.data$.next(this.initData);
  }

  public connect(): BehaviorSubject<T[]> {
    const displayDataChanges = [
      this.filtersState$,
      this.sortState$,
      this.paginatorState$,
      this.addDeleteData$
    ];

    combineLatest(...displayDataChanges).subscribe(
      ([filtersState, sortState, paginatorState]: [{ filters: any | null }, { sort: IFrontTableSort | null }, { paginator: ITablePagination | null }]) => {
        let data: T[] = this.initData.slice();
        if (filtersState.filters) {
          data = this.dataMultiFilter(data, filtersState.filters);
        }
        if (sortState.sort) {
          data = this.dataSort(data, sortState.sort);
        }
        this.paginateData$.next(data.slice());
        if (paginatorState.paginator) {
          data = this.dataPaginator(data, paginatorState.paginator);
        }
        this.data$.next(data);
      }
    );
    return this.data$;
  }

  public disconnect(): void {
  }

  public applySort(sortInfo: IFrontTableSort): void {
    this.sortState$.next({ sort: sortInfo });
  }

  public applyPaginator(paginatorInfo: ITablePagination): void {
    this.paginatorState$.next({ paginator: paginatorInfo });
  }

  public applyDeleted(id: string): void {
    this.initData = this.initData.filter((item: any) => item.id !== id);
    this.addDeleteData$.next(this.initData);
  }

  public applyAddItems(data: any): void {
    this.initData = this.initData.concat(data);
    this.addDeleteData$.next(this.initData);
  }

  // TODO typings
  private dataMultiFilter(data: T[], filters: any): T[] {
    const filterKeys = Object.keys(filters);
    return data.filter((item: T) => {
      return filterKeys.every((key: any) => {
        return item[key].match(filters[key]);
      });
    });
  }

  public dataSort(data: T[], sortData: IFrontTableSort): T[] {
    if (!sortData.active || sortData.direction === '') {
      return data;
    }
    return data.sort((valueA: T, valueB: T) => {
      return (
        (valueA[sortData.active] < valueB[sortData.active] ? -1 : 1) *
        (sortData.direction === 'asc' ? 1 : -1)
      );
    });
  }

  public dataPaginator(data: T[], paginatorData: ITablePagination): T[] {
    const startIndex = paginatorData.pageIndex * paginatorData.pageSize;
    return data.splice(startIndex, paginatorData.pageSize);
  }
}
