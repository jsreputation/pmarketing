import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LargeListItemComponent } from './large-list-item.component';

describe('LargeListItemComponent', () => {
  let component: LargeListItemComponent;
  let fixture: ComponentFixture<LargeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.reward = {
      id: 1,
      rewardThumbnail: './assets/images/Group_10985@2x.png',
      name: '40% OFF at New World Makati Hotel',
      description:
        'Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card.',
      subtitle: '',
      validTo: new Date(),
      validFrom: new Date(),
      rewardBanner: '',
      loyalty: [],
      termsAndConditions: '',
      categoryTags: [
        {
          id: 1,
          title: 'nearby'
        },
        {
          id: 2,
          title: 'new'
        },
        {
          id: 3,
          title: 'other'
        }
      ],
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should run an event after click to the elements', () => {
    spyOn(component, 'selectItem')
    component.reward = {
      id: 1,
      rewardThumbnail: './assets/images/Group_10985@2x.png',
      name: '40% OFF at New World Makati Hotel',
      description:
        'Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card.',
      subtitle: '',
      validTo: new Date(),
      validFrom: new Date(),
      rewardBanner: '',
      loyalty: [],
      termsAndConditions: '',
      categoryTags: [
        {
          id: 1,
          title: 'nearby'
        },
        {
          id: 2,
          title: 'new'
        },
        {
          id: 3,
          title: 'other'
        }
      ],
    };
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.item');
    element.click();
    expect(component.selectItem).toHaveBeenCalled();
  });
});
