import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagListComponent } from './tag-list.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TagListComponent', () => {
  let component: TagListComponent;
  let fixture: ComponentFixture<TagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MatChipsModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        NoopAnimationsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
