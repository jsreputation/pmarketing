import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import {
  AuthenticationService,
  Config,
  ITheme,
  ThemesService,
} from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.scss']
})
export class PIComponent implements OnInit, OnDestroy {
  public PIForm: FormGroup;
  public errorMessage: string;
  public preAuth: boolean;
  public failedAuth: boolean;
  private destroy$: Subject<any> = new Subject();
  public theme: ITheme;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private themesService: ThemesService,
    private config: Config
  ) {
    this.preAuth = this.config ? this.config.preAuth : false;
  }

  public ngOnInit(): void {
    this.initForm();
    this.theme = this.themesService.getActiveTheme();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public redirectAfterLogin(): void {
    this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'wallet');
  }

  public initForm(): void {
    this.PIForm = this.fb.group({
      pi: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    const pi: string = (this.PIForm.get('pi').value as string);
    this.errorMessage = null;
    // @TODO: call an API
    console.log('pi', pi);
  }
}
