import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AudiencesService } from '@cl-core/services';
import { AddUserPopupComponent } from '../add-user-popup/add-user-popup.component';
import { FormControl } from '@angular/forms';
import { ManageListPopupComponent } from '../manage-list-popup/manage-list-popup.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SettingsService } from '@cl-core-services';
import { filter, switchMap } from 'rxjs/operators';

import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';

@Component({
  selector: 'cl-audiences-page',
  templateUrl: './audiences-page.component.html',
  styleUrls: ['./audiences-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public currentTab: string;
  public tabs: FormControl;
  public search: FormControl;
  public searchKey = 'query';
  public dataSource: CustomDataSource<IUser>;
  public audiencesDataSource: CustomDataSource<IAudiences>;

  public tabsFilterConfig: OptionConfig[] = [
    { title: 'Users', value: 'users' },
    { title: 'Audience List', value: 'audience' }
  ];
  public config: any[];

  constructor(
    private settingsService: SettingsService,
    private audiencesService: AudiencesService,
    private audiencesUserService: AudiencesUserService,
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) {
    this.dataSource = new CustomDataSource<IUser>(this.audiencesUserService);
    this.audiencesDataSource = new CustomDataSource<IAudiences>(this.audiencesService);
    this.tabs = new FormControl('users');
    this.search = new FormControl('');
  }

  public ngOnInit(): void {
    this.tabs.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(tab => this.changeList(tab));
  }

  public ngAfterViewInit(): void {
    this.settingsService.getRolesOptions()
      .subscribe(config => this.config = config);
  }

  /** necessary as we are using untilDestroyed on observables */
  public ngOnDestroy(): void { }

  public openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserPopupComponent, { panelClass: 'audience-dialog' });

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((newUser: any) => this.audiencesUserService.createUser(newUser))
      )
      .subscribe(() => {
        this.dataSource.updateData();
        this.snack.open('User successfully created.', 'x', { duration: 2000 });
        this.currentTab = 'users';
      });
  }

  public openManageListDialog(item: number): void {
    const dialogRef = this.dialog.open(ManageListPopupComponent, { panelClass: 'manage-list-dialog', data: item });
    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((updateUser: any) => this.audiencesUserService.updateUserPools(updateUser))
      )
      .subscribe(() => this.dataSource.updateData());
  }

  public changeList(tab: string): void {
    switch (tab) {
      case 'audience':
        this.searchKey = 'id';

        this.audiencesDataSource = new CustomDataSource<IAudiences>(this.audiencesService);
        const params: HttpParamsOptions = { include: 'users' };
        this.audiencesDataSource.params = params;
        break;
      case 'users':
      default:
        this.searchKey = 'query';
        this.dataSource = new CustomDataSource<IUser>(this.audiencesUserService);
    }
    this.currentTab = tab;
    this.cd.detectChanges();
  }

  get hasData(): boolean {
    return true;
  }
}
