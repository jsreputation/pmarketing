import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AudiencesUserInfoPageComponent } from './audiences-user-info-page.component';
import { AudiencesUserInfoComponent } from '../../components/audiences-user-info/audiences-user-info.component';
import {
  MatFormFieldModule, MatInputModule, MatTableModule, MatTabsModule, MatIconModule,
  MatMenuModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatSortModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { AudiencesVouchersListComponent } from '../../components/audiences-vouchers-list/audiences-vouchers-list.component';
import { TableFiltersModule, SearchFilterModule, ButtonModule, PaginationModule, StatusLabelModule, PipesModule } from '@cl-shared';
import { TabsFilterModule } from '../../../shared/table/tabs-filter/tabs-filter.module';
import { AudiencesUsersListComponent } from '../../components/audiences-users-list/audiences-users-list.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AudiencesListComponent } from '../../components/audiences-list/audiences-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AudiencesVouchersService, MessageService } from '@cl-core-services';
import { AudiencesCommunicationsListComponent } from '../../components/audiences-communications-list/audiences-communications-list.component';
import { AudiencesLoyaltyGridComponent } from '../../components/audiences-loyalty-grid/audiences-loyalty-grid.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AudiencesUserInfoPageComponent', () => {
  let component: AudiencesUserInfoPageComponent;
  let fixture: ComponentFixture<AudiencesUserInfoPageComponent>;
  const messageServiceStub: Partial<MessageService> = {
    show: () => ({})
  };
  const matDialodRefStub = {
    close: () => { }
  };
  const matDialogDataStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatTableModule,
        MatSortModule,
        PaginationModule,
        TableFiltersModule,
        SearchFilterModule,
        ButtonModule,
        TabsFilterModule,
        MatTabsModule,
        BrowserDynamicTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatMenuModule,
        StatusLabelModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        BrowserDynamicTestingModule,
        PipesModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: MessageService, useValue: messageServiceStub },
        AudiencesUserService,
        AudiencesVouchersService,
        { provide: MatDialogRef, useValue: matDialodRefStub },
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataStub }
      ],
      declarations: [
        AudiencesUserInfoPageComponent,
        AudiencesUserInfoComponent,
        AudiencesVouchersListComponent,
        AudiencesCommunicationsListComponent,
        AudiencesUsersListComponent,
        AudiencesListComponent,
        AudiencesLoyaltyGridComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesUserInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
