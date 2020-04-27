import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  ITheme,
  AuthenticationService,
  NotificationService,
  ProfileService,
  IProfile,
  ICustomProperties
} from '@perxtech/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-lucky-draw-details',
  templateUrl: './lucky-draw-details.component.html',
  styleUrls: ['./lucky-draw-details.component.scss']
})
export class LuckyDrawDetailsComponent implements OnInit, OnDestroy {
  public luckdrawForm: FormGroup;
  public errorMessage: string | null;
  public appAccessTokenFetched: boolean = false;
  public profile: IProfile;
  private destroy$: Subject<void> = new Subject();
  public theme: Observable<ITheme>;

  constructor(
    private fb: FormBuilder,
    // private router: Router,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.getAppToken();
    this.initForm();
  }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
      if (!res.customProperties) {
        return;
      }
      this.luckdrawForm.patchValue({ fullName: oc(this.profile).customProperties.fullName('') });
      this.luckdrawForm.patchValue({ hkid: oc(this.profile).customProperties.hkid('') });
      // this.luckdrawForm.patchValue({ accept_marketing: true });
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAppToken(): void {
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error(`Error${err}`);
      });
    }
  }

  private initForm(): void {
    this.luckdrawForm = this.fb.group({
      fullName: ['', [Validators.required]],
      hkid: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('[0-9]*')
      ]],
      accept_marketing: [false, [Validators.requiredTrue]]
    });
  }

  public onSubmit(): void {
    // if you're in here, config file has checked
    // also precondition when you sign up custom properties related to lucky draw is alrdy there
    // therefore setCustomProperties can patch those keys
    if (!this.appAccessTokenFetched) {
      this.translate.get('SIGN_UP_PAGE.UNKNOWN_ERROR_TXT').subscribe(text =>
        this.errorMessage = text
      );
      return;
    }
    const fullName = this.luckdrawForm.value.fullName;
    const hkid = this.luckdrawForm.value.hkid;

    // might include nickname too, figma design doesnt show
    const luckyDrawData: ICustomProperties = {
      fullName,
      hkid
    };

    this.profileService.setCustomProperties(luckyDrawData).subscribe(
      () => {
        this.translate.get('SIGN_UP_PAGE.INFORMATION_UPDATE').subscribe(text =>
          this.notificationService.addSnack(text)
        );
      },
      err => {
        console.error(`${err.error.message}`);
        this.translate.get('SIGN_UP_PAGE.INFORMATION_UPDATE_FAIL').subscribe(text =>
          this.notificationService.addSnack(text)
        );
      });
  }
}
