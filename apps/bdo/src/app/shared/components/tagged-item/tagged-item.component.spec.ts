import { rewards } from './../../../../../../../libs/blackcomb-pages/projects/perx-blackcomb-pages/src/lib/mock/rewards.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaggedItemComponent } from './tagged-item.component';
import { By } from '@angular/platform-browser';
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
    component.deals = rewards;
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('.item'));
    expect(elements.length).toEqual(rewards.length);
  });
});
