import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, MessageService } from '@es-core';

interface StateObjIntf {
  id: string;
  user: string;
  navigationId: number;
}

@Component({
  selector: 'es-pages-forget-password',
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

  public get username(): AbstractControl | null { return this.formForget.get('username'); }

  private createForm(state: StateObjIntf): void {
    this.formForget = this.fb.group({
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
    this.authService.resetPassword('retail', this.formForget.value.username)
      .subscribe(
        () => this.messageService.show('Check your emails 📧'),
        () => this.messageService.show('Something went wrong', 'warning'),
      );
  }
}
