import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsExpiryGroupComponent } from './points-expiry-group.component';

describe('PointsExpiryGroupComponent', () => {
  let component: PointsExpiryGroupComponent;
  let fixture: ComponentFixture<PointsExpiryGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsExpiryGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsExpiryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
