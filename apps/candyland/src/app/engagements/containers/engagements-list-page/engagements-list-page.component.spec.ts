import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsListPageComponent } from './engagements-list-page.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';

describe('EngagementsListPageComponent', () => {
  let component: EngagementsListPageComponent;
  let fixture: ComponentFixture<EngagementsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementsListPageComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
