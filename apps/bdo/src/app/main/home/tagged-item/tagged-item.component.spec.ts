import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaggedItemComponent } from './tagged-item.component';
import { By } from '@angular/platform-browser';
import { LIST_NEAR_BY } from '../../../mock-data/near-by.mock';
import { MatIconModule } from '@angular/material/icon';

describe('TaggedItemComponent', () => {
  let component: TaggedItemComponent;
  let fixture: ComponentFixture<TaggedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggedItemComponent ],
      imports: [ MatIconModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of input elements', () => {
    component.deals = LIST_NEAR_BY;
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('.item'));
    expect(elements.length).toEqual(LIST_NEAR_BY.length);
  });
});
