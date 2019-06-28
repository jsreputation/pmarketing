import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationCodeComponent } from './activation-code.component';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { VouchersModule } from '@perx/core/dist/perx-core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { PerxCoreModule, AuthenticationModule, CognitoModule, OauthModule } from '@perx/core/dist/perx-core';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ActivationCodeComponent', () => {
  let component: ActivationCodeComponent;
  let fixture: ComponentFixture<ActivationCodeComponent>;
  let location: Location;
  let router: Router;
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationCodeComponent],
      imports: [
        RouterTestingModule,
        PerxCoreModule,
        MatDialogModule,
        NoopAnimationsModule,
        MatCardModule,
        AuthenticationModule,
        MatCardModule,
        BrowserAnimationsModule,
        VouchersModule.forRoot({ env: environment }),
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment })
      ],
      providers: [
        {
          provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }
        }
      ]
    })
      .compileComponents();
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    dialog = TestBed.get(MatDialog);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to redemption page', () => {
    spyOn(router, 'navigate').and.stub();
    const id = '1';
    component.pinInputSuccess(id);
    expect(router.navigate).toHaveBeenCalledWith([`/redemption/${id}`]);
  });

  it("show goBack to previous page once cancelled", () => {
    spyOn(location, 'back');
    component.onCancel();
    expect(location.back).toHaveBeenCalledTimes(1);
  });

  it('shows information without details', () => {
    const config = {
      data: {
        title: 'You need to login to reddem the voucher',
        buttonTxt: 'Go to login'
      }
    };
    dialog.open(PerxCoreModule, config);

    const h1 = overlayContainerElement.querySelector('#mat-dialog-title-0');
    const button = overlayContainerElement.querySelector('button');

    expect(h1.textContent).toBe('User cannot be saved without an email');
    expect(button.textContent).toBe('Go to login');
  });

  it('should needLoginPopup if status is 401 from errorHandler', () => {
    spyOn(component, 'needLoginPopup');
    component.errorHandler(401);
    expect(component.needLoginPopup).toHaveBeenCalled();
  });

  it('should errorPopup if status is not 401 from errorHandler', () => {
    spyOn(component, 'errorPopup');
    component.errorHandler(500);
    expect(component.errorPopup).toHaveBeenCalled();
  });

  it('should call popup from needLoginPopup', () => {
    spyOn(component, 'popup');
    component.needLoginPopup();
    expect(component.popup).toHaveBeenCalledWith({
      title: 'You need to login to reddem the voucher',
      buttonTxt: 'Go to login'
    });
  });

  it('should call popup from errorPopup', () => {
    spyOn(component, 'popup');
    component.errorPopup();
    expect(component.popup).toHaveBeenCalledWith({
      title: 'Error occur, please try again later'
    });
  });

});
