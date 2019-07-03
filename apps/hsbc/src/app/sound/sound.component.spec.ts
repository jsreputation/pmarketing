import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundComponent } from './sound.component';
import { MatIconModule, MatDialogModule, MatButtonModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('SoundComponent', () => {
  let component: SoundComponent;
  let fixture: ComponentFixture<SoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundComponent ],
      imports: [
        MatIconModule,
        MatDialogModule,
        MatButtonModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
