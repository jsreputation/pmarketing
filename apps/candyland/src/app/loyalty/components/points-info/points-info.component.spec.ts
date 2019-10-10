import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsInfoComponent } from './points-info.component';

describe('PointsInfoComponent', () => {
  let component: PointsInfoComponent;
  let fixture: ComponentFixture<PointsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
