import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJoinMethodComponent } from './user-joining-method.component';

describe('UserJoinMethodComponent', () => {
  let component: UserJoinMethodComponent;
  let fixture: ComponentFixture<UserJoinMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserJoinMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJoinMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
