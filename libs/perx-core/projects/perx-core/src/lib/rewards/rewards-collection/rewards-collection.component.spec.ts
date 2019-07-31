import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsCollectionComponent } from './rewards-collection.component';
import { MaterialModule } from '../../shared/material.module';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';

describe('RewardsCollectionComponent', () => {
  let component: RewardsCollectionComponent;
  let fixture: ComponentFixture<RewardsCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsCollectionComponent ],
      imports: [
        MaterialModule,
        NgxMultiLineEllipsisModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
