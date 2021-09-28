import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.reward = {
      id: 1,
      name: 'Testing Component',
      description: 'This is reward description',
      subtitle: '',
      termsAndConditions: '',
      loyalty: [],
      rewardBanner: '',
      validFrom: new Date(),
      validTo: new Date()
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
