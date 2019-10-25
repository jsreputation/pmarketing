import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPieComponent } from './grid-pie.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GridPieComponent', () => {
  let component: GridPieComponent;
  let fixture: ComponentFixture<GridPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPieComponent ],
      imports: [
        NgxChartsModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
