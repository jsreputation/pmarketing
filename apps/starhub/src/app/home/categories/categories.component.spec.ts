import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { MatIconModule, MatCardModule } from '@angular/material';
import { categories } from '../../category.mock';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
      imports: [
        MatIconModule,
        MatCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit tap with selected category', () => {
    const category = categories[0];
    spyOn(component.tapped, 'emit');
    component.selected(category);
    expect(component.tapped.emit).toHaveBeenCalledWith(category);
  });
});
