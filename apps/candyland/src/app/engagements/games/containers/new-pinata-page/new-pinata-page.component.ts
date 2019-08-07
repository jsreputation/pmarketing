import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { PinataHttpService } from '@cl-core/http-services/pinata-http.service';
import { RoutingStateService } from '@cl-core/services/routing-state.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ControlValueService } from '@cl-core/services/control-value.service';
import { ControlsName } from '../../../../models/controlsName';

@Component({
  selector: 'cl-new-pinata-page',
  templateUrl: './new-pinata-page.component.html',
  styleUrls: ['./new-pinata-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPinataPageComponent implements OnInit {
  public formPinata: FormGroup;
  public pinataData$: Observable<{
    pinata: IGraphic[],
    background: IGraphic[]
  }>;
  constructor(private fb: FormBuilder,
              private pinataHttpService: PinataHttpService,
              private routingState: RoutingStateService,
              private router: Router,
              private controlValueService: ControlValueService) { }

  public ngOnInit(): void {
    this.createPinataForm();
    this.getPinataData();
  }

  public save(): void {
    this.router.navigateByUrl('/engagements');
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
      name: ['Create Hit the Pinata Template A', [Validators.required,
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
    this.pinataData$ = this.pinataHttpService.getPinataData()
      .pipe(
        tap((res) => {
          this.formPinata.patchValue({
            [ControlsName.pinata]: res.pinata[0],
            [ControlsName.background]: res.background[0]
          });
        })
      );
  }
}
