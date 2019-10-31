import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeRewardExpiresFormGroupComponent } from './before-reward-expires-form-group.component';

describe('BeforeRewardExpiresFormGroupComponent', () => {
  let component: BeforeRewardExpiresFormGroupComponent;
  let fixture: ComponentFixture<BeforeRewardExpiresFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeRewardExpiresFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeRewardExpiresFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
