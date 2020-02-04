import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
import { ApiDataSource } from '../table-data-source/api-data-source';

@Component({
  selector: 'cl-paginator',
  templateUrl: './api-paginator.component.html',
  styleUrls: ['./api-paginator.component.scss']
})
export class ApiPaginatorComponent implements AfterViewInit, OnDestroy {
  @Input() public pageSizeOptions: number[];
  @Input() public pageSize: number = 5;
  @Input() public dataSource: ApiDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) public paginator: MatPaginator;

  private componentActive: boolean = true;

  public ngAfterViewInit(): void {
    this.checkExistAndHandling();
    this.setIndexPage();
    this.setLengthPages();
  }

  public checkExistAndHandling(): void {
    if (this.paginator) {
      this.handlingChangPagination();
    }
  }

  /* *
   * subscribe on change pagination and handling chang pagination
   * */
  public handlingChangPagination(): void {
    this.paginator.page
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(() => {
        this.dataSource.pagination = {
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize || this.pageSize
        };
      });
  }

  /* *
   * set pagination 0 after filtration or sort
   * */
  public setIndexPage(): void {
    this.dataSource.changeSearch$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((val: number) => {
        this.paginator.pageIndex = val;
      });
  }

  /* *
   * set length of pages
   * */
  public setLengthPages(): void {
    this.dataSource
      .length$
      .subscribe((val: number) => {
        this.paginator.length = val;
      });
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }

}
