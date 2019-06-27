import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { map, tap } from 'rxjs/operators';
import { EngagementsService } from '@cl-core/http-services/engagements-https.service';
import { TabsFilterComponent } from '@cl-shared/table-entities/tabs-filter/tabs-filter.component';
import { SearchFilterComponent } from '@cl-shared/table-entities/search-filter/search-filter.component';
import { combineLatest } from 'rxjs';

export interface Engagements {
  id: number;
  name: string;
  status: string;
  type: string;
}

@Component({
  selector: 'cl-engagements-list-page',
  templateUrl: './engagements-list-page.component.html',
  styleUrls: ['./engagements-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementsListPageComponent implements AfterViewInit {

  public displayedColumns = ['name', 'status', 'type', 'actions'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('tabsFilter', {static: false}) tabsFilter: TabsFilterComponent;
  @ViewChild('searchFilter', {static: false}) searchFilter: SearchFilterComponent;

  constructor(private engagementsService: EngagementsService) {
  }

  ngAfterViewInit() {
    this.getBooks();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.tabsFilter.filterChanges(), this.searchFilter.filterChanges());
    combineLatest([this.searchFilter.filterChanges(), this.tabsFilter.filterChanges()])
      .subscribe(([name, type]) => {
        console.log('filter');
        this.dataSource.filterPredicate = (data) => {
          return data.name.toLowerCase().includes(name) && data.type.includes(type);
        };
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      });
  }

  public getBooks() {
    this.engagementsService.getEngagements()
      .pipe(
        tap(data => console.log(data)),
        map((response: any) => response.results)
        // map(response => {
        //   return response.data.map(item => {
        //       return {
        //         content: item.attributes.content,
        //         cover: item.attributes.display_properties.image,
        //         link: item.links.self,
        //         created: item.attributes.created_at,
        //         updated: item.attributes.updated_at
        //       } as BookItemInterface;
        //     }
        //   );
        // })
      )
      .subscribe((res: Engagements[]) => {
        this.dataSource.data = res;
      });
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
