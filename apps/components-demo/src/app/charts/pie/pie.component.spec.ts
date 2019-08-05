import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieComponent } from './pie.component';
import { PerxChartModule } from '@perx/chart';

describe('PieComponent', () => {
  let component: PieComponent;
  let fixture: ComponentFixture<PieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PieComponent],
      imports: [PerxChartModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
