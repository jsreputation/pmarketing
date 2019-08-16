import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SuccessfulRedemptionComponent } from './successful-redemption.component';
import { HeaderModule } from '../../header/header.module';

describe('SusscessfullRedemptionComponent', () => {
  let component: SuccessfulRedemptionComponent;
  let fixture: ComponentFixture<SuccessfulRedemptionComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SuccessfulRedemptionComponent
      ],
      imports: [
        RouterTestingModule,
        HeaderModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
