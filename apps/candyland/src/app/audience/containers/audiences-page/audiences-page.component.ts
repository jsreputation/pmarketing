import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { AudiencesService } from '@cl-core/services/audiences.service';
import { AddUserPopupComponent } from '../add-user-popup/add-user-popup.component';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-audiences-page',
  templateUrl: './audiences-page.component.html',
  styleUrls: ['./audiences-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesPageComponent implements OnInit, AfterViewInit {
  currentTab;
  tabs: FormControl;
  search: FormControl;
  searchKey = 'firstName';
  public dataSource = new MatTableDataSource<any>();
  public users;
  public audiences;
  public tabsFilterConfig: OptionConfig[] = [
    {title: 'Users(340)', value: 'users'},
    {title: 'Audience List(3)', value: 'audience'}
  ];
  // public hasData = true;
  // public isGridMode = true;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private audiencesService: AudiencesService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
    this.tabs = new FormControl('users');
    this.search = new FormControl('');
  }

  ngOnInit(): void {
    this.tabs.valueChanges.subscribe(tab => this.changeList(tab));
    // this.search.valueChanges.subscribe(query => this.dataSource.filter([this.searchKey]: query));
  }

  ngAfterViewInit() {
    this.getUsers();
    this.getAudiences();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
    // this.updateDataSource(this.users);
  }

  private updateDataSource(data) {
    this.dataSource.data = data;
  }

  public openDialogCreate(): void {
    const dialogRef = this.dialog.open(AddUserPopupComponent, {panelClass: 'audience-dialog'});

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  changeList(tab) {
    switch (tab) {
      case 'audience':
        this.updateDataSource(this.audiences);
        this.searchKey = 'firstName';
        break;
      case 'users':
      default:
        this.updateDataSource(this.users);
        this.searchKey = 'listName';
    }
    this.currentTab = tab;
    this.cd.detectChanges();
  }

  get hasData() {
    return true;
    // (!!this.users && this.users.length > 0) || (!!this.audiences && this.audiences.length > 0);
  }

  private getUsers() {
    this.audiencesService.getUsers()
      .subscribe((res: any[]) => {
        this.users = res;
        this.dataSource.data = res;
      });
  }

  private getAudiences() {
    this.audiencesService.getAudiences().pipe(
      map((data: any[]) => (
          data.map(item => {
            item.updated = new Date(item.updated);
            return item;
          })
        )
      )
    )
      .subscribe((res: any[]) => {
        this.audiences = res;
      });
  }
}
