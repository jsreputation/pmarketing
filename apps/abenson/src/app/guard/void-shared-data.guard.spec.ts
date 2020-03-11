import { TestBed, inject } from '@angular/core/testing';

import { VoidSharedDataGuard } from './void-shared-data.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountComponent } from '../account/account.component';
import { ProfileModule } from '@perxtech/core';

describe('VoidSharedDataGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoidSharedDataGuard],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'account',
          component: AccountComponent
        }]),
        ProfileModule
      ],
      declarations: [
        AccountComponent
      ]
    });
  });

  it('should ...', inject([VoidSharedDataGuard], (guard: VoidSharedDataGuard) => {
    expect(guard).toBeTruthy();
  }));
});
