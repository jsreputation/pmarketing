import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material';

import { CustomerSupportComponent } from './customer-support.component';
import { Type } from '@angular/core';

describe('CustomerSupportComponent', () => {
  let component: CustomerSupportComponent;
  let fixture: ComponentFixture<CustomerSupportComponent>;
  let dialog: MatDialog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSupportComponent],
      imports: [
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupportComponent);
    dialog = TestBed.get<MatDialog>(MatDialog as Type<MatDialog>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialog open', () => {
    const spy = spyOn(dialog, 'open');
    component.openContacts();
    expect(spy).toHaveBeenCalled();
  });
});
