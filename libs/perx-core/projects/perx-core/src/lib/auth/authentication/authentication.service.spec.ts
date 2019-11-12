import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { Type } from '@angular/core';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AuthenticationService]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService as Type<AuthenticationService>);
    expect(service).toBeTruthy();
  });
});
