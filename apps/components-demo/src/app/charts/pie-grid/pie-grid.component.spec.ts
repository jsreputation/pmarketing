import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieGridComponent } from './pie-grid.component';
import { PerxChartModule } from '@perx/chart';

describe('PieGridComponent', () => {
  let component: PieGridComponent;
  let fixture: ComponentFixture<PieGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieGridComponent ],
      imports: [
        PerxChartModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
