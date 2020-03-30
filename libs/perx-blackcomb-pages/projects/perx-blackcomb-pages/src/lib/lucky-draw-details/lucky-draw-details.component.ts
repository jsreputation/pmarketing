import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  ITheme,
  ThemesService,
  AuthenticationService,
  NotificationService,
  ProfileService,
  IProfile
} from '@perxtech/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';

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
  @ViewChild('luckEditForm', {static: false}) documentEditForm: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    // private router: Router,
    private themesService: ThemesService,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private notificationService: NotificationService
  ) {
    this.initForm();
    this.getAppToken();
  }

  public ngOnInit(): void {
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
      this.theme = this.themesService.getThemeSetting();
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
        this.theme = this.themesService.getThemeSetting();
      }, (err) => {
        console.error(`Error${err}`);
      });
    }
    // need confirm the key or if this is even the correct svc
    // referencing merck-condition page
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
      if (!res.customProperties) {
        return;
      }
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
      fullName: ['', Validators.required],
      hkid: ['', Validators.required],
      accept_marketing: [false]
    });
  }

  public onSubmit(): void {
    // if you're in here, config file has checked
    // also precondition when you sign up custom properties related to lucky draw is alrdy there
    // therefore setCustomProperties can patch those keys
    if (!this.appAccessTokenFetched) {
      this.errorMessage = 'Unknown error occured.';
      return;
    }
    const fullName = this.luckdrawForm.value.fullName;
    const hkid = this.luckdrawForm.value.hkid;

    // might include nickname too, figma design doesnt show
    const luckyDrawData: any = {
      fullName,
      hkid
    };

    this.profileService.setCustomProperties(luckyDrawData).subscribe(
      () => this.notificationService.addSnack('Information Updated.'),
      err => {
        this.notificationService.addSnack(`ProfileService::SetCustomProperties : ${err.error.message}`);
      });
  }
}
