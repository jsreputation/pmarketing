import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SuccessfulRedemptionComponent } from './successful-redemption.component';
import { HeaderModule } from '../../header/header.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SusscessfullRedemptionComponent', () => {
  let component: SuccessfulRedemptionComponent;
  let fixture: ComponentFixture<SuccessfulRedemptionComponent>;
  let debugElem: DebugElement;
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
    debugElem = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a success label', () => {
    const label = debugElem.query(By.css('.img-label')).nativeElement;
    expect(label.textContent).toBe('Request successfully being processed');
  });
});
