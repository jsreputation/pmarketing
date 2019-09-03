import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnInit,
  OnDestroy
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { AudiencesService } from '@cl-core/services';
import { AddUserPopupComponent } from '../add-user-popup/add-user-popup.component';
import { FormControl } from '@angular/forms';
import { ManageListPopupComponent } from '../manage-list-popup/manage-list-popup.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SettingsService } from '@cl-core-services';
import { filter, map, switchMap } from 'rxjs/operators';
import { AudiencesUsersListDataSource } from '@cl-shared/table/data-source/audiences-users-list-data-source';

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
  public searchKey = 'primary_identifier';
  public dataSource: AudiencesUsersListDataSource<IUser>;
  public users;
  public audiences;
  public tabsFilterConfig: OptionConfig[] = [
    {title: 'Users(340)', value: 'users'},
    {title: 'Audience List(3)', value: 'audience'}
  ];
  public config: any;

  constructor(private settingsService: SettingsService,
              private audiencesService: AudiencesService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
    this.dataSource = new AudiencesUsersListDataSource<IUser>(this.audiencesService);
    this.tabs = new FormControl('users');
    this.search = new FormControl('');
  }

  public ngOnInit(): void {
    this.tabs.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(tab => this.changeList(tab));
  }

  public ngAfterViewInit(): void {
    this.getAudiences();
    this.settingsService.getRolesOptions()
      .subscribe(config => this.config = config);

  }

  public ngOnDestroy(): void {
  }

  public openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserPopupComponent, {panelClass: 'audience-dialog'});

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((newUser: any) => this.audiencesService.createUser(newUser))
      )
      .subscribe(() => {
        this.dataSource.updateData();
      });
  }

  public openManageListDialog(item): void {
    const dialogRef = this.dialog.open(ManageListPopupComponent, {panelClass: 'manage-list-dialog', data: item});

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(user => {
        if (user) {
          this.users.push(user);
        }
      });
  }

  public changeList(tab): void {
    switch (tab) {
      case 'audience':
        this.searchKey = 'list_name';
        // this.dataSource = new CustomDataSource(this.audiencesService);
        this.getAudiences();
        break;
      case 'users':
      default:
        this.searchKey = 'primary_identifier';
        this.dataSource = new AudiencesUsersListDataSource<IUser>(this.audiencesService);
    }
    this.currentTab = tab;
    this.cd.detectChanges();
  }

  get hasData(): boolean {
    return true;
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
