import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimaryCatalogComponent } from './primary-catalog.component';
import { LIST_CATEGORY } from '../../../mock-data/categories.mock';
import { By } from '@angular/platform-browser';

describe('PrimaryCatalogComponent', () => {
  let component: PrimaryCatalogComponent;
  let fixture: ComponentFixture<PrimaryCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryCatalogComponent ],
      imports: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of input elements', () => {
    component.categories = LIST_CATEGORY;
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('.item'));
    expect(elements.length).toEqual(LIST_CATEGORY.length);
  });
});
