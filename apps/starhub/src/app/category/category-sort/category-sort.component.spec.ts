import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySortComponent } from './category-sort.component';
import { MatCardModule, MatIconModule, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material';

describe('CategorySortComponent', () => {
  let component: CategorySortComponent;
  let fixture: ComponentFixture<CategorySortComponent>;
  const matBottomSheetRefStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySortComponent],
      imports: [
        MatCardModule,
        MatBottomSheetModule,
        MatIconModule
      ],
      providers: [
        { provide: MatBottomSheetRef, useValue: matBottomSheetRefStub }
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
});
