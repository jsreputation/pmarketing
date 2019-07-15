import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { PinataHttpService } from '@cl-core/http-services/pinata-http.service';
import { RoutingStateService } from '@cl-core/services/routing-state.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cl-new-pinata-page',
  templateUrl: './new-pinata-page.component.html',
  styleUrls: ['./new-pinata-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPinataPageComponent implements OnInit {
  public formPinata: FormGroup;
  public backgrounds$: Observable<IGraphic>;
  public pinata$: Observable<IGraphic>;
  constructor(private fb: FormBuilder,
              private pinataHttpService: PinataHttpService,
              private routingState: RoutingStateService,
              private router: Router) { }

  ngOnInit() {
    this.createPinataForm();
    this.getPinata();
    this.getBackgroundData();
  }


  public save(): void {
    console.log(this.formPinata.value);
    this.router.navigateByUrl('/engagements');
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  public get name(): AbstractControl {
    return this.formPinata.get('name');
  }

  public get headlineMessage(): AbstractControl {
    return this.formPinata.get('headlineMessage');
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formPinata.get('subHeadlineMessage');
  }

  public get buttonText(): AbstractControl {
    return this.formPinata.get('buttonText');
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

  private getPinata(): void {
    this.pinata$ = this.pinataHttpService.getPinata()
      .pipe(
        tap((res) => {
          this.patchForm('pinata', res[0]);
        })
      );
  }

  private getBackgroundData(): void {
     this.backgrounds$ = this.pinataHttpService.getBackground()
       .pipe(
         tap((res) => {
           this.patchForm('background', res[0]);
         })
       );
  }

  private patchForm(fieldName: string, value: any): void {
    this.formPinata.patchValue({
      [fieldName]: value
    });
  }
}
