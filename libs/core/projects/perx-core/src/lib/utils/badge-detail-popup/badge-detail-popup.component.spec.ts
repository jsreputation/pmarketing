import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeDetailPopupComponent } from './badge-detail-popup.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('BadgeDetailPopupComponent', () => {
  let component: BadgeDetailPopupComponent;
  let fixture: ComponentFixture<BadgeDetailPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeDetailPopupComponent],
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
    fixture = TestBed.createComponent(BadgeDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
