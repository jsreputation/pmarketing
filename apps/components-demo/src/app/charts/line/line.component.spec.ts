import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineComponent } from './line.component';
import { PerxChartModule } from '@perx/chart';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LineComponent', () => {
  let component: LineComponent;
  let fixture: ComponentFixture<LineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineComponent ],
      imports: [
        PerxChartModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
