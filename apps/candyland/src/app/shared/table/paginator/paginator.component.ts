import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { takeWhile } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'cl-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements AfterViewInit, OnDestroy {
  @Input() public pageSizeOptions: number[];
  @Input() public pageSize: number;
  @Input() public dataSource: CustomDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) public paginator: MatPaginator;

  public itemCount = 0;
  private componentActive = true;

  public ngAfterViewInit(): void {
    this.checkExistAndHandling();
    this.setIndexPage();
    this.setLengthItems();
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
          pageSize: this.paginator.pageSize
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
   * set length of all items
   * */
  public setLengthItems(): void {
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
