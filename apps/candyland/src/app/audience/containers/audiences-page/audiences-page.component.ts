import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';
import { FormControl } from '@angular/forms';

import {
  combineLatest,
  Observable,
  Subject,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { AudiencesService, MessageService, SettingsService } from '@cl-core/services';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import {
  CustomDataSource,
  DataSourceStates,
} from '@cl-shared/table/data-source/custom-data-source';

import { UpsertUserPopupComponent } from '../upsert-user-popup/upsert-user-popup.component';
import { ManageListPopupComponent, ManageListPopupComponentOutput } from '../manage-list-popup/manage-list-popup.component';
import {
  IUpsertUserPopup,
  Type,
} from '../../audience.model';
import { IAudience } from '@cl-core/models/audiences/audiences';
import { IAudiencesUserForm } from '@cl-core/models/audiences/user.interface';
import { OptionConfig } from '@perx/candyshop';

@Component({
  selector: 'cl-audiences-page',
  templateUrl: './audiences-page.component.html',
  styleUrls: ['./audiences-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public currentTab: string;
  public tabs: FormControl;
  public search: FormControl;
  public searchKey: string = 'query';
  public dataSource: CustomDataSource<IAudiencesUserForm>;
  public audiencesDataSource: CustomDataSource<IAudience>;
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;

  public tabsFilterConfig: OptionConfig[] = [
    { title: 'Customers', value: 'users' },
    { title: 'Audience List', value: 'audience' }
  ];
  public config: any[];

  constructor(
    private settingsService: SettingsService,
    private audiencesService: AudiencesService,
    private audiencesUserService: AudiencesUserService,
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    public messageService: MessageService
  ) {
    this.dataSource = new CustomDataSource<IAudiencesUserForm>(this.audiencesUserService);
    this.audiencesDataSource = new CustomDataSource<IAudience>(this.audiencesService);
    this.tabs = new FormControl('users');
    this.search = new FormControl('');
  }

  public ngOnInit(): void {
    this.tabs.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(tab => this.changeList(tab));
  }

  public ngAfterViewInit(): void {
    this.settingsService.getRolesOptions()
      .subscribe(config => this.config = config);
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openAddUserDialog(): void {
    const dialogData: IUpsertUserPopup = { panelClass: 'audience-dialog', data: { type: Type.Add } };
    this.dialog.open(UpsertUserPopupComponent, dialogData)
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((newUser: any) => this.audiencesUserService.createUser(newUser))
      )
      .subscribe(() => {
        this.dataSource.updateData();
        this.messageService.show('User successfully created.');
        this.currentTab = 'users';
      });
  }

  public openManageListDialog(item: number): void {
    this.dialog.open<ManageListPopupComponent, number, ManageListPopupComponentOutput>(
      ManageListPopupComponent,
      { panelClass: 'manage-list-dialog', data: item }
    ).afterClosed()
      .pipe(
        filter(Boolean), // this filters out clicks on cancel
        switchMap((updateUser: ManageListPopupComponentOutput) => this.audiencesUserService.updateUserPools(updateUser))
      )
      .subscribe(() => this.dataSource.updateData());
  }

  public changeList(tab: string): void {
    this.searchKey = 'query';
    switch (tab) {
      case 'audience':
        this.audiencesDataSource = new CustomDataSource<IAudience>(this.audiencesService);
        break;
      case 'users':
      default:
        this.dataSource = new CustomDataSource<IAudiencesUserForm>(this.audiencesUserService);
    }
    this.currentTab = tab;
    this.cd.detectChanges();
  }

  public get hasData$(): Observable<boolean> {
    return combineLatest(this.dataSource.state$, this.audiencesDataSource.state$).pipe(
      map(([stateUser, stateAudience]) =>
        (stateUser === this.dataSourceStates.hasDataApi || stateAudience === this.dataSourceStates.hasDataApi) &&
        stateUser !== this.dataSourceStates.noDataApi
      ),
      distinctUntilChanged()
    );
  }

  public get noData$(): Observable<boolean> {
    return this.dataSource.state$.pipe(
      map((stateUser) => stateUser === this.dataSourceStates.noDataApi),
      distinctUntilChanged()
    );
  }
}
