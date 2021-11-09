import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimaryCatalogComponent } from './primary-catalog.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HOME_LIST_CATEGORY_CONFIGURATIONS } from '../../../shared/constants/home-category-configuration.const';

describe('PrimaryCatalogComponent', () => {
  let component: PrimaryCatalogComponent;
  let fixture: ComponentFixture<PrimaryCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryCatalogComponent ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryCatalogComponent);
    component = fixture.componentInstance;
    component.categories = HOME_LIST_CATEGORY_CONFIGURATIONS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of input elements', () => {
    component.categories = HOME_LIST_CATEGORY_CONFIGURATIONS;
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('.item'));
    expect(elements.length).toEqual(HOME_LIST_CATEGORY_CONFIGURATIONS.length);
  });
});
