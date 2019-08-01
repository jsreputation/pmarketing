import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPharmacyComponent } from './find-pharmacy.component';

describe('FindPharmacyComponent', () => {
  let component: FindPharmacyComponent;
  let fixture: ComponentFixture<FindPharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
