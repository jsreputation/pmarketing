import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MatIconModule } from '@angular/material';

import { CallUsComponent } from './call-us.component';
import { Type } from '@angular/core';

describe('CallUsComponent', () => {
  let component: CallUsComponent;
  let fixture: ComponentFixture<CallUsComponent>;
  let dialogRef: MatDialogRef<CallUsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CallUsComponent],
      imports: [
        MatDialogModule,
        MatIconModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => { } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallUsComponent);
    dialogRef = TestBed.get<MatDialogRef<CallUsComponent>>(MatDialogRef as Type<MatDialogRef<CallUsComponent>>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close', () => {
    const spy = spyOn(dialogRef, 'close');
    component.back();
    expect(spy).toHaveBeenCalled();
  });
});
