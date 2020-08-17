import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsPageComponent } from './rewards-page.component';
import { MatAutocompleteModule, MatIconModule, MatInputModule, MatTabsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RewardsModule, RewardsService } from '@perxtech/core';
import { of } from 'rxjs';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterTestingModule } from '@angular/router/testing';

const rewardsServiceStub: Partial<RewardsService> = {
  getAllRewards: () => of([]),
  getRewards: () => of([]),
  getCategories: () => of([]),
};

describe('RewardsPageComponent', () => {
  let component: RewardsPageComponent;
  let fixture: ComponentFixture<RewardsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsPageComponent],
      imports: [
        RewardsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        InfiniteScrollModule,
        NgxMultiLineEllipsisModule,
        RouterTestingModule,
      ],
      providers: [{ provide: RewardsService, useValue: rewardsServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
