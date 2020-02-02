import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemedComponent } from './redeemed.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';

describe('RedeemedComponent', () => {
  let component: RedeemedComponent;
  let fixture: ComponentFixture<RedeemedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedeemedComponent],
      imports: [UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
