import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampComponent } from './stamp.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StampsService, CsvReportService } from '@cl-core-services';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('StampComponent', () => {
  let component: StampComponent;
  let fixture: ComponentFixture<StampComponent>;
  const csvReportServiceStub: Partial<CsvReportService> = {};
  const stampsServiceStub: Partial<StampsService> = {
    getStampsReport: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StampComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: StampsService, useValue: stampsServiceStub },
        { provide: CsvReportService, useValue: csvReportServiceStub }
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
