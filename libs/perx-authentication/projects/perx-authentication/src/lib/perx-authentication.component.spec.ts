import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerxAuthenticationComponent } from './perx-authentication.component';

describe('PerxAuthenticationComponent', () => {
  let component: PerxAuthenticationComponent;
  let fixture: ComponentFixture<PerxAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerxAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerxAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
