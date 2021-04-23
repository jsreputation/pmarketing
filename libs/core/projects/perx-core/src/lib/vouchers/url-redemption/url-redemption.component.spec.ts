import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService, UtilsModule } from '@perxtech/core';
import { UrlRedemptionComponent } from './url-redemption.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('UrlRedemptionComponent', () => {
  let component: UrlRedemptionComponent;
  let fixture: ComponentFixture<UrlRedemptionComponent>;

  const notificationServiceStub: Partial<NotificationService> = {
    addSnack: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlRedemptionComponent ],
      imports: [
        UtilsModule,
        MatIconModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: NotificationService, useValue: notificationServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
