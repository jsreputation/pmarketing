import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEngagementPopupComponent } from './create-engagement-popup.component';

describe('CreateEngagementPopupComponent', () => {
  let component: CreateEngagementPopupComponent;
  let fixture: ComponentFixture<CreateEngagementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEngagementPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEngagementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
