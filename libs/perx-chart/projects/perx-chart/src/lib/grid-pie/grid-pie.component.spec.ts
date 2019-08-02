import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPieComponent } from './grid-pie.component';

describe('GridPieComponent', () => {
  let component: GridPieComponent;
  let fixture: ComponentFixture<GridPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPieComponent ]
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
