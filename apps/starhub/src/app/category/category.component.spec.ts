import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatToolbarModule, MatCardModule, MatBottomSheetModule } from '@angular/material';
import { RewardsService } from '@perx/core';
import { of } from 'rxjs';
import { rewards } from '../rewards.mock';
import { catalogs } from '../catalogs.mock';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const rewardsServiceStub = {
    getAllRewards: () => of(rewards),
    getCatalog: () => of(catalogs[0])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatBottomSheetModule,
        MatCardModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
