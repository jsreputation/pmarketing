import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJoiningMethodComponent } from './user-joining-method.component';

describe('UserJoiningMethodComponent', () => {
  let component: UserJoiningMethodComponent;
  let fixture: ComponentFixture<UserJoiningMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserJoiningMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJoiningMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
