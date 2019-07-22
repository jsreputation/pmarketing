import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiencesUsersListComponent } from './audiences-users-list.component';

describe('AudiencesUsersListComponent', () => {
  let component: AudiencesUsersListComponent;
  let fixture: ComponentFixture<AudiencesUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiencesUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
