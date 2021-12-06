import { TestBed } from '@angular/core/testing';
import { AuthorizatedGuard } from './authorizated.guard';

describe('AuthorizatedGuardGuard', () => {
  let guard: AuthorizatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
