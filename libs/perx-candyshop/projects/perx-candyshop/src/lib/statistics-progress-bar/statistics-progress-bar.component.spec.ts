import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsProgressBarComponent } from './statistics-progress-bar.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('VouchersProgressBarComponent', () => {
  let component: StatisticsProgressBarComponent;
  let fixture: ComponentFixture<StatisticsProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsProgressBarComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsProgressBarComponent);
    component = fixture.componentInstance;
    component.options = [{ type: 'test', value: 5 }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
