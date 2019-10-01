import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MatIconModule } from '@angular/material';

import { CallUsComponent } from './call-us.component';

describe('CallUsComponent', () => {
  let component: CallUsComponent;
  let fixture: ComponentFixture<CallUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallUsComponent ],
      imports: [
        MatDialogModule,
        MatIconModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
