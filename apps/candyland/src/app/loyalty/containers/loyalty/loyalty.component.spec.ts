import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyComponent } from 'src/app/loyalty/containers/loyalty/loyalty.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('EngagementsComponent', () => {
  let component: LoyaltyComponent;
  let fixture: ComponentFixture<LoyaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ LoyaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
