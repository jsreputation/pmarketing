import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUploadDialogComponent } from './multi-upload-dialog.component';

describe('MultiUploadDialogComponent', () => {
  let component: MultiUploadDialogComponent;
  let fixture: ComponentFixture<MultiUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
