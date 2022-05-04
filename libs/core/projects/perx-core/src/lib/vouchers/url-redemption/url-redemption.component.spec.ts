import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService, PipeUtilsModule, UtilsModule } from '@perxtech/core';
import { UrlRedemptionComponent } from './url-redemption.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';

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
        TranslateModule.forRoot(),
        PipeUtilsModule
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

  it('url field should be present', () => {
    const url = fixture.nativeElement.querySelector('.url-txt');
    expect(url).toBeTruthy();
  });

  it('url value should be equal to vouhcer.code', () => {
    component.url = 'voucher.code';
    fixture.detectChanges();
    const url = fixture.nativeElement.querySelector('.url-txt');
    expect(url.textContent.trim()).toEqual('voucher.code');
  });
});
