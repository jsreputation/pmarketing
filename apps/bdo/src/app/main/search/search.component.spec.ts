import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { RewardsService } from '@perxtech/core';
import { Router } from '@angular/router';
class MockRewardService {
  getTrending() {
    return of();
  }
}

class MockRouter {
  navigate(){
    
  }
}
describe('SearchComponent', () => {

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers:
      [
        { provide: RewardsService, useClass: MockRewardService },
        { provide: Router, useClass: MockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
