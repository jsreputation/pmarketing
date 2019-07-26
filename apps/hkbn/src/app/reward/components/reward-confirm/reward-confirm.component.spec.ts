import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardConfirmComponent } from './reward-confirm.component';
import { MAT_DIALOG_DATA, MatButtonModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RewardsModule } from '@perx/core/dist/perx-core';

describe('RewardConfirmComponent', () => {
  let component: RewardConfirmComponent;
  let fixture: ComponentFixture<RewardConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RewardsModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
      declarations: [RewardConfirmComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
