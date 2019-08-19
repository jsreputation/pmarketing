import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemComponent } from './redeem.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
