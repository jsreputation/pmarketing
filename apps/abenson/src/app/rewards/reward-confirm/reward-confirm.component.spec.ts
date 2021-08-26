import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardConfirmComponent } from './reward-confirm.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('RewardConfirmComponent', () => {
  let component: RewardConfirmComponent;
  let fixture: ComponentFixture<RewardConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardConfirmComponent],
      imports: [
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {
            }
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
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
