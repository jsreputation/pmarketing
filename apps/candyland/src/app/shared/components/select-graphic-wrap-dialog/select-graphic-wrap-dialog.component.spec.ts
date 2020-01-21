import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGraphicWrapDialogComponent } from './select-graphic-wrap-dialog.component';

describe('SelectGraphicWrapDialogComponent', () => {
  let component: SelectGraphicWrapDialogComponent;
  let fixture: ComponentFixture<SelectGraphicWrapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGraphicWrapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGraphicWrapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
