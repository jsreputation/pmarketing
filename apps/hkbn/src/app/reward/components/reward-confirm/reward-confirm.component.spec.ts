import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardConfirmComponent } from './reward-confirm.component';
import { MAT_DIALOG_DATA, MatButtonModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RewardsModule, LoyaltyService } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

const loyaltyServiceStub: Partial<LoyaltyService> = {
  getLoyalties: () => of([]),
  getLoyalty: () => of()
};

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
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {
            }
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
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
