import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListTabbedComponent } from './rewards-list-tabbed.component';
import { RewardsListComponent } from '../rewards-list/rewards-list.component';
import { MaterialModule } from '../../shared/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RewardsListTabbedComponent', () => {
  let component: RewardsListTabbedComponent;
  let fixture: ComponentFixture<RewardsListTabbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule
      ],
      declarations: [RewardsListTabbedComponent, RewardsListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListTabbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
