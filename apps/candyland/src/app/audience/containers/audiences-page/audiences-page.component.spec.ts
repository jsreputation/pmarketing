import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiencesPageComponent } from './audiences-page.component';
import { SettingsService, AudiencesService, MessageService } from '@cl-core-services';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import {
  PaginationModule,
  TableFiltersModule,
  SearchFilterModule,
  NoDataModule
} from '@cl-shared';
import { ButtonModule, StatusLabelModule } from '@perxtech/candyshop';
import { TabsFilterModule } from '../../../shared/table/tabs-filter/tabs-filter.module';
import {
  MatIconModule,
  MatTableModule,
  MatSortModule,
  MatTabsModule,
  MatMenuModule,
  MatDialogModule
} from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MockAudiencesUserService } from '@cl-shared/test-components/providers/mock-audiences-user.service';
import { MockAudienceService } from '@cl-shared/test-components/providers/mock-audience.service';
import { MockSettingsService } from '@cl-shared/test-components/providers/mock-settings.service';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { MockLoyaltyServices } from '@cl-shared/test-components/providers/mock-loyalty.services';
describe('AudiencesPageComponent', () => {
  let component: AudiencesPageComponent;
  let fixture: ComponentFixture<AudiencesPageComponent>;
  const msgSvcStub: Partial<MessageService> = {
    show: () => ({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ButtonModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        PaginationModule,
        TableFiltersModule,
        SearchFilterModule,
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        TabsFilterModule,
        MatTabsModule,
        MatIconModule,
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule,
        NoDataModule,
        StatusLabelModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        LocalStorageService,
        {
          provide: MessageService, useValue: msgSvcStub
        },
        { provide: AudiencesUserService, useClass: MockAudiencesUserService },
        { provide: AudiencesService, useClass: MockAudienceService },
        { provide: SettingsService, useClass: MockSettingsService },
        { provide: LoyaltyService, useClass: MockLoyaltyServices },
      ],
      declarations: [
        AudiencesPageComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
