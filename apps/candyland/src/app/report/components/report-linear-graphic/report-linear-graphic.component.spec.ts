import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReportLinearGraphicComponent } from './report-linear-graphic.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ReportLinearGraphicComponent', () => {
  let component: ReportLinearGraphicComponent;
  let fixture: ComponentFixture<ReportLinearGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportLinearGraphicComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLinearGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
