import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { ControlsName } from '../../../../models/controls-name';
import {
  ControlValueService,
  EngagementTransformDataService,
  PinataService,
  RoutingStateService
} from '@cl-core/services';
import { ConfirmModalComponent } from '@cl-shared';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'cl-new-pinata-page',
  templateUrl: './new-pinata-page.component.html',
  styleUrls: ['./new-pinata-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPinataPageComponent implements OnInit, OnDestroy {
  public formPinata: FormGroup;
  public pinataData$: Observable<{
    pinata: IGraphic[],
    background: IGraphic[]
  }>;
  private destroy$ = new Subject();
  constructor(private fb: FormBuilder,
              private pinataService: PinataService,
              private routingState: RoutingStateService,
              private router: Router,
              private controlValueService: ControlValueService,
              private engagementTransformDataService: EngagementTransformDataService,
              public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.createPinataForm();
    this.getPinataData();
  }

  public save(): void {
    const sendData = this.engagementTransformDataService.transformPinata(this.formPinata.value);
    this.pinataService.createPinata({ data: sendData })
      .subscribe(() => {
        this.showLaunchDialog();
      });
  }

  public showLaunchDialog(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(result => {

        if (result) {
          this.router.navigateByUrl('/engagements');
        }
      });
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  public get name(): AbstractControl {
    return this.formPinata.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.formPinata.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formPinata.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.formPinata.get(ControlsName.buttonText);
  }

  public get background(): AbstractControl {
    return this.formPinata.get(ControlsName.background);
  }

  public get pinata(): AbstractControl {
    return this.formPinata.get(ControlsName.pinata);
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return this.controlValueService.getImgLink(control, defaultImg);
  }

  private createPinataForm(): void {
    this.formPinata = this.fb.group({
      name: ['Hit the Pinata Template', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: ['Tap the Piñata and Win!', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      subHeadlineMessage: ['Tap the piñata until you get a reward!', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      pinata: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: ['start playing', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getPinataData(): void {
    this.pinataData$ = this.pinataService.getPinataData()
      .pipe(
        tap((res) => {
          this.formPinata.patchValue({
            [ControlsName.pinata]: res.pinata[0],
            [ControlsName.background]: res.background[0]
          });
        })
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
