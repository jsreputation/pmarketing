import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveChartComponent } from './top-five-chart.component';

describe('TopFiveChartComponent', () => {
  let component: TopFiveChartComponent;
  let fixture: ComponentFixture<TopFiveChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopFiveChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFiveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
