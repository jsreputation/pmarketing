import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  OnInit,
  OnDestroy
} from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { AudiencesService } from '@cl-core/services';
import { AddUserPopupComponent } from '../add-user-popup/add-user-popup.component';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ManageListPopupComponent } from '../manage-list-popup/manage-list-popup.component';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-audiences-page',
  templateUrl: './audiences-page.component.html',
  styleUrls: ['./audiences-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public currentTab;
  public tabs: FormControl;
  public search: FormControl;
  public searchKey = 'firstName';
  public dataSource = new MatTableDataSource<any>();
  public users;
  public audiences;
  public tabsFilterConfig: OptionConfig[] = [
    {title: 'Users(340)', value: 'users'},
    {title: 'Audience List(3)', value: 'audience'}
  ];

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private audiencesService: AudiencesService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
    this.tabs = new FormControl('users');
    this.search = new FormControl('');
  }

  public ngOnInit(): void {
    this.tabs.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(tab => this.changeList(tab));
    this.search.valueChanges.pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      debounceTime(500)
    )
      .subscribe(query => {
          const searchTerm = JSON.stringify({[this.searchKey]: query});
          this.dataSource.filter = searchTerm;
        }
      );
  }

  public ngAfterViewInit(): void {
    this.getUsers();
    this.getAudiences();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
  }

  private updateDataSource(data): void {
    this.dataSource.data = data;
  }

  public openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserPopupComponent, {panelClass: 'audience-dialog'});

    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.users.push(user);
      }
    });
  }

  public openManageListDialog(item): void {
    const dialogRef = this.dialog.open(ManageListPopupComponent, {panelClass: 'manage-list-dialog', data: item});

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(user => {
      if (user) {
        this.users.push(user);
      }
    });
  }

  public changeList(tab): void {
    switch (tab) {
      case 'audience':
        this.updateDataSource(this.audiences);
        this.searchKey = 'listName';
        break;
      case 'users':
      default:
        this.updateDataSource(this.users);
        this.searchKey = 'firstName';
    }
    this.currentTab = tab;
    this.cd.detectChanges();
  }

  get hasData(): boolean {
    return true;
  }

  private getUsers(): void {
    this.audiencesService.getUsers()
      .subscribe((res: any[]) => {
        this.users = res;
        this.dataSource.data = res;
      });
  }

  private getAudiences(): void {
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
