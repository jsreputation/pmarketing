import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiusCircleChartComponent } from './radius-circle-chart.component';

describe('RadiusCircleChartComponent', () => {
  let component: RadiusCircleChartComponent;
  let fixture: ComponentFixture<RadiusCircleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadiusCircleChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiusCircleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
