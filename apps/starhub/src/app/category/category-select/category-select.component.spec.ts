import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CategorySelectComponent } from './category-select.component';
import { MatIconModule, MatBottomSheetModule, MatCardModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Type } from '@angular/core';
import { categories } from '../../category.mock';

describe('CategorySelectComponent', () => {
  let component: CategorySelectComponent;
  let fixture: ComponentFixture<CategorySelectComponent>;
  const matBottomSheetRefStub = { dismiss: () => {} };

  const dataStub = {
    categorySelectedCallback: () => {},
    getCurrentSelectedCategory: () => {
      return '';
    }
  };

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
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: dataStub }
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

  it('should select category Eat', () => {
    component.onCategorySelected(categories[1]);
    expect(component.selectedCategory).toBe('Eat');
  });

  it('should call bottomSheetRef dismiss', () => {
    const bottomSheet = TestBed.get<MatBottomSheetRef>(MatBottomSheetRef as Type<MatBottomSheetRef>);
    const bottomSheetSpy = spyOn(bottomSheet, 'dismiss');
    component.dismiss(new MouseEvent('click'));
    expect(bottomSheetSpy).toHaveBeenCalled();
  });

  it('should call category selected call back', inject([MAT_BOTTOM_SHEET_DATA], (data) => {
    const bottomSheet = TestBed.get<MatBottomSheetRef>(MatBottomSheetRef as Type<MatBottomSheetRef>);
    const bottomSheetSpy = spyOn(bottomSheet, 'dismiss');
    const categorySelectedCallbackSpy = spyOn(data, 'categorySelectedCallback');
    component.apply(new MouseEvent('click'));
    expect(bottomSheetSpy).toHaveBeenCalled();
    expect(categorySelectedCallbackSpy).toHaveBeenCalled();

  }));
});
