import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPreviewSelectorComponent } from './dialog-preview-selector.component';
import {PipesModule} from '@cl-shared/pipes/pipes.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

describe('DialogPreviewSelectorComponent', () => {
  let component: DialogPreviewSelectorComponent;
  let fixture: ComponentFixture<DialogPreviewSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPreviewSelectorComponent ],
      imports: [ PipesModule ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPreviewSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
