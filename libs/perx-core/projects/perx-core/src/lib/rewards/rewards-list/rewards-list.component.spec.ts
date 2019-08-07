import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListComponent } from './rewards-list.component';
import { MatCardModule } from '@angular/material';
import { UtilsModule } from '../../utils/utils.module';

describe('RewardsListComponent', () => {
  let component: RewardsListComponent;
  let fixture: ComponentFixture<RewardsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsListComponent],
      imports: [
        MatCardModule,
        UtilsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
