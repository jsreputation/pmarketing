// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyItemComponent } from 'src/app/loyalty/components/loyalty-item/loyalty-item.component';
import { PipesModule } from '@cl-shared/pipes/pipes.module';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('LoyaltyItemComponent', () => {
  let component: LoyaltyItemComponent;
  let fixture: ComponentFixture<LoyaltyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoyaltyItemComponent],
      imports: [
        RouterTestingModule,
        PipesModule,
        MatMenuModule,
        MatIconModule,
        TranslateModule.forRoot()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
