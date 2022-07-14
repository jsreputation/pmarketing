import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipeUtilsModule } from '@perxtech/core';

import { StampCardNoteComponent } from './stamp-card-note.component';

describe('StampCardNoteComponent', () => {
  let component: StampCardNoteComponent;
  let fixture: ComponentFixture<StampCardNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampCardNoteComponent ],
      imports: [
        PipeUtilsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StampCardNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
