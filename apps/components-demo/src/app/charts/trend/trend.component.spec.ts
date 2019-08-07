import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendComponent } from './trend.component';
import { PerxChartModule } from '@perx/chart';

describe('TrendComponent', () => {
  let component: TrendComponent;
  let fixture: ComponentFixture<TrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendComponent ],
      imports: [
        PerxChartModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
