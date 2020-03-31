import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHeatmapComponent } from './calendar-heatmap.component';
import { PerxChartModule } from '@perxtech/chart';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CalendarHeatmapComponent', () => {
  let component: CalendarHeatmapComponent;
  let fixture: ComponentFixture<CalendarHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarHeatmapComponent],
      imports: [
        PerxChartModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
