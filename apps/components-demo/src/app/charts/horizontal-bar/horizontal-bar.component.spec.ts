import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalBarComponent } from './horizontal-bar.component';
import { PerxChartModule } from '@perx/chart';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HorizontalBarComponent', () => {
  let component: HorizontalBarComponent;
  let fixture: ComponentFixture<HorizontalBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalBarComponent],
      imports: [
        PerxChartModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
