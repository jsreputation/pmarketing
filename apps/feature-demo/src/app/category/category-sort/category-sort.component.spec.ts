import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CategorySortComponent } from './category-sort.component';
import { MatCardModule, MatIconModule, MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Type } from '@angular/core';
import { SortingMode } from '../category.model';

describe('CategorySortComponent', () => {
  let component: CategorySortComponent;
  let fixture: ComponentFixture<CategorySortComponent>;
  const matBottomSheetRefStub = { dismiss: () => {} };

  const dataStub = {
    sortOrderSelectedCallback: () => {},
    getCurrentSelectedOrder: () => {
      return SortingMode.latest;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySortComponent],
      imports: [
        MatCardModule,
        MatBottomSheetModule,
        MatIconModule
      ],
      providers: [
        { provide: MatBottomSheetRef, useValue: matBottomSheetRefStub },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: dataStub }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select selected criteria', () => {
    component.onSortingOrderSelected(SortingMode.latest);
    expect(component.selectedCriteria).toBe(SortingMode.latest);
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
    const sortOrderSelectedCallbackSpy = spyOn(data, 'sortOrderSelectedCallback');
    component.apply(new MouseEvent('click'));
    expect(bottomSheetSpy).toHaveBeenCalled();
    expect(sortOrderSelectedCallbackSpy).toHaveBeenCalled();

  }));
});
