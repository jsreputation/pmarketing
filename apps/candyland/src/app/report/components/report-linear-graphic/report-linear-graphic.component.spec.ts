import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLinearGraphicComponent } from './report-linear-graphic.component';

describe('ReportLinearGraphicComponent', () => {
  let component: ReportLinearGraphicComponent;
  let fixture: ComponentFixture<ReportLinearGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLinearGraphicComponent ]
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
