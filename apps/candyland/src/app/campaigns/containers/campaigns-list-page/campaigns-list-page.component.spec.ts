import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsListPageComponent } from './campaigns-list-page.component';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TableFiltersModule } from '@cl-shared';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { CampaignsService, MessageService } from '@cl-core-services';
import { CsvReportService } from '@cl-core-services';
import { MockCampaignService } from '@cl-shared/test-components/providers/mock-campaign.service';

describe('CampaignsListPageComponent', () => {
  let component: CampaignsListPageComponent;
  let fixture: ComponentFixture<CampaignsListPageComponent>;
  const csvReportServiceStub: Partial<CsvReportService> = {};
  const msgSvcStub: Partial<MessageService> = {
    show: () => ({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TableFiltersModule,
        BrowserDynamicTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [CampaignsListPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MessageService, useValue: msgSvcStub },
        { provide: CsvReportService, useValue: csvReportServiceStub },
        { provide: CampaignsService, useClass: MockCampaignService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
