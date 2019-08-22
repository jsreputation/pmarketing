import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySelectComponent } from './category-select.component';
import { MatIconModule, MatBottomSheetModule, MatCardModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

describe('CategorySelectComponent', () => {
  let component: CategorySelectComponent;
  let fixture: ComponentFixture<CategorySelectComponent>;
  const matBottomSheetRefStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySelectComponent],
      imports: [
        MatIconModule,
        MatCardModule,
        MatBottomSheetModule
      ],
      providers: [
        { provide: MatBottomSheetRef, useValue: matBottomSheetRefStub },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
