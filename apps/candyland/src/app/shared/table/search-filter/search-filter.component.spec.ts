import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterComponent } from './search-filter.component';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;
  let control: FormControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
      ],
      declarations: [ SearchFilterComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    control = new FormControl();
    component.control = control;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
