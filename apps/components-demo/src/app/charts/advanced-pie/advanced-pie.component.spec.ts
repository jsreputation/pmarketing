import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedPieComponent } from './advanced-pie.component';
import { PerxChartModule } from '@perx/chart';

describe('AdvancedPieComponent', () => {
  let component: AdvancedPieComponent;
  let fixture: ComponentFixture<AdvancedPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedPieComponent ],
      imports: [
        PerxChartModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
