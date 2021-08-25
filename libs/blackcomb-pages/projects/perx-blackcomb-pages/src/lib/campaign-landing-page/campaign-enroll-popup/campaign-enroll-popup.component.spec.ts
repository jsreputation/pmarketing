import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignEnrollPopupComponent } from './campaign-enroll-popup.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('BadgeDetailPopupComponent', () => {
  let component: CampaignEnrollPopupComponent;
  let fixture: ComponentFixture<CampaignEnrollPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignEnrollPopupComponent],
      imports: [
        MatDialogModule,
        MatIconModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignEnrollPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
