import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { QRCodeModule } from 'angularx-qrcode';
import { ProfileService } from '@perx/core';
import { RedeemComponent } from './redeem.component';
import { of } from 'rxjs';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemComponent ],
      imports: [
        RouterTestingModule,
        QRCodeModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {
          provide: ProfileService,
          useValue: { whoAmI: () => of({})}
        }
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
