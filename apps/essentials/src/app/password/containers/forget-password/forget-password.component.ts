import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, MessageService } from '@cl-core-services';

interface StateObjIntf {
  id: string;
  user: string;
  navigationId: number;
}

@Component({
  selector: 'perx-blackcomb-pages-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public formForget: FormGroup;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  get accountId(): AbstractControl | null { return this.formForget.get('account_id'); }
  get username(): AbstractControl | null { return this.formForget.get('username'); }

  private createForm(state: StateObjIntf): void {
    this.formForget = this.fb.group({
      account_id: [state.id || null, [
        Validators.required,
        Validators.pattern(/([0-9]|[A-Z]|-)*/i),
        Validators.minLength(3),
        Validators.maxLength(64)
      ]],
      username: [state.user || null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]]
    });
  }

  public ngOnInit(): void {
    const state = this.location.getState() as StateObjIntf;
    this.createForm(state);
  }

  public onSubmit(): void {
    this.authService.resetPassword(this.formForget.value.account_id, this.formForget.value.username)
      .subscribe(
        () => this.messageService.show('Check your emails 📧'),
        () => this.messageService.show('Something went wrong', 'warning'),
      );
  }
}
