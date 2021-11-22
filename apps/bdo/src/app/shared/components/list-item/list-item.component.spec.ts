import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from '@angular/material/dialog';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemComponent ],
      imports:[
        RouterTestingModule.withRoutes([]),
        MatDialogModule
      ],
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
      thumbnail: './assets/images/Group_10985@2x.png',
      name: '40% OFF at New World Makati Hotel',
      description:
        'Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card.',
      categoryTags: [],
      createdAt: new Date(),
      tags: []
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
