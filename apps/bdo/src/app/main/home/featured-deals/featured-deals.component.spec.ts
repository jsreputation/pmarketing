import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeatureDealsComponent } from './featured-deals.component';
import { LIST_FEATURED_DEALS } from '../../../mock-data/featured-deals.mock';

describe('FeatureDealsComponent', () => {
  let component: FeatureDealsComponent;
  let fixture: ComponentFixture<FeatureDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureDealsComponent ],
      imports: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of input elements', () => {
    component.deals = LIST_FEATURED_DEALS;
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('.item'));
    expect(elements.length).toEqual(LIST_FEATURED_DEALS.length);
  });

  it('should run an event after click to the elements', () => {
    spyOn(component, 'itemClick')
    component.deals = LIST_FEATURED_DEALS;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.item');
    element.click();
    expect(component.itemClick).toHaveBeenCalled();
  });
});
