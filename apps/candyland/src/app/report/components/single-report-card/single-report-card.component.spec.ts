import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReportCardComponent } from './single-report-card.component';

describe('SingleReportCardComponent', () => {
  let component: SingleReportCardComponent;
  let fixture: ComponentFixture<SingleReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleReportCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
