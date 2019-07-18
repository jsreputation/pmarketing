import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageListPopupComponent } from './manage-list-popup.component';

describe('ManageListPopupComponent', () => {
  let component: ManageListPopupComponent;
  let fixture: ComponentFixture<ManageListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageListPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
