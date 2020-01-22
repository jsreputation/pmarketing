import { HttpClientTestingModule } from '@angular/common/http/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoyaltyListPageComponent } from 'src/app/loyalty/containers/loyalty-list-page/loyalty-list-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { MockLoyaltyServices } from '@cl-shared/test-components/providers/mock-loyalty.services';

describe('LoyaltyListPageComponent', () => {
  let component: LoyaltyListPageComponent;
  let fixture: ComponentFixture<LoyaltyListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [LoyaltyListPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LoyaltyService, useClass: MockLoyaltyServices}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
