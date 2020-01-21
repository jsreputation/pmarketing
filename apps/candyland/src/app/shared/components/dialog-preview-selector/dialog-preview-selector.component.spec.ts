import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPreviewSelectorComponent } from './dialog-preview-selector.component';

describe('DialogColorSelectorComponent', () => {
  let component: DialogPreviewSelectorComponent;
  let fixture: ComponentFixture<DialogPreviewSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPreviewSelectorComponent ]
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
