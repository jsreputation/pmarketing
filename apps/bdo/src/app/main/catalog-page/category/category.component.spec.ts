import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { CategoryComponent } from './category.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterService } from '../../../shared/services/filter.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterDialogService } from '../../../shared/services/filter.dialog.service';
describe('SortComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CategoryComponent
      ],
      imports: [
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        },
        FilterService,
        FilterDialogService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
