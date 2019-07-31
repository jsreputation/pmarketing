import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PerxCoreModule } from '@perx/core';
import { RedeemComponent } from './redeem.component';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemComponent ],
      imports: [RouterTestingModule, PerxCoreModule]
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
