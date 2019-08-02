import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteNewUsersPopupComponent } from 'src/app/settings/containers/users-roles/containers/invite-new-users-popup/invite-new-users-popup.component';

describe('InviteNewUsersPopupComponent', () => {
  let component: InviteNewUsersPopupComponent;
  let fixture: ComponentFixture<InviteNewUsersPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteNewUsersPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteNewUsersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
