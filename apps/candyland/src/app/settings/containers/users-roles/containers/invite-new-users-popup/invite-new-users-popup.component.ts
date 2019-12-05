import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '@cl-core/services';
import { ClValidators } from '@cl-helpers/cl-validators';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { RoleLabelConfig } from '@cl-shared';
import { takeUntil } from 'rxjs/operators';
import { IAMUser } from '@cl-core/models/settings/IAMUser.interface';

export interface InviteNewUsersPopupComponentData {
  user?: IAMUser;
  groups: any[];
}
@Component({
  selector: 'cl-invite-new-users-popup',
  templateUrl: './invite-new-users-popup.component.html',
  styleUrls: ['./invite-new-users-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InviteNewUsersPopupComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) public stepper: MatStepper;
  public form: FormGroup;
  public config: any[];
  public roleLabel: { [key: string]: RoleLabelConfig };
  protected destroy$: Subject<void> = new Subject();
  constructor(
    public dialogRef: MatDialogRef<InviteNewUsersPopupComponent>,
    private fb: FormBuilder,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: InviteNewUsersPopupComponentData,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.config = this.data.groups;
    this.initForm();
    this.doPatchForm(this.data.user);
    this.prepareRoleLabel();
  }

  public get isFirstStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === 0;
  }

  public goBack(): void {
    this.stepper.previous();
  }

  public goNext(): void {
    this.stepper.next();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public invite(): void {
    this.dialogRef.close({ ...this.form.value });
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)]
      ],
      email: [null, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(50),
        ClValidators.email]],
      roleId: [null, [Validators.required]]
    });
  }

  private doPatchForm(data: IAMUser): void {
    return data && this.patchValue(data);
  }

  private patchValue(data: IAMUser): void {
    this.form.patchValue({
      name: data.username,
      email: data.email ? data.email : null,
      roleId: data.relationships_groups_id ? data.relationships_groups_id : null
    });
  }

  private getTranslation(): Observable<any> {
    return this.translate.get('ROLE_TYPES');
  }

  private getRoleLabel(): Observable<{ [key: string]: RoleLabelConfig }> {
    return this.settingsService.getRoleLabel();
  }

  private prepareRoleLabel(): void {
    combineLatest([this.getTranslation(), this.getRoleLabel()])
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(([translation, label]) => {
        Object.values(label)
          .forEach((item) => {
            item.title = translation[item.title];
            item.abbr = translation[item.abbr];
          });
        this.roleLabel = label;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
