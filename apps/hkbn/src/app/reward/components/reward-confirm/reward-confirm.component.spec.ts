import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardConfirmComponent } from './reward-confirm.component';
import { MAT_DIALOG_DATA, MatButtonModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RewardsModule } from '@perx/core';

describe('RewardConfirmComponent', () => {
  let component: RewardConfirmComponent;
  let fixture: ComponentFixture<RewardConfirmComponent>;
  let dialogRef: MatDialogRef<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RewardsModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {
            }
          }
        },
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
      declarations: [RewardConfirmComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardConfirmComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.get(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close(true), when call confirm method', () => {
    const dialogRefSpy = spyOn(dialogRef, 'close');
    component.confirm();
    expect(dialogRefSpy).toHaveBeenCalledWith(true);
  });

  it('should call dialogRef.close(false), when call back method', () => {
    const dialogRefSpy = spyOn(dialogRef, 'close');
    component.back();
    expect(dialogRefSpy).toHaveBeenCalledWith(false);
  });
});
