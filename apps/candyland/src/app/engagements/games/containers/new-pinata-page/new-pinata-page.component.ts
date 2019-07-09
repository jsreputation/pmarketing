import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IGraphic } from '@cl-shared/models/graphick.model';
import { PinataHttpService } from '@cl-core/http-services/pinata-http.service';

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
              private pinataHttpService: PinataHttpService) { }

  ngOnInit() {
    this.createPinataForm();
    this.getPinata();
    this.getBackgroundData();
  }


  public save(): void {
    console.log(this.formPinata.value);
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
      headlineMessage: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      subHeadlineMessage: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      pinata: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getPinata(): void {
    this.pinata$ = this.pinataHttpService.getPinata();
  }

  private getBackgroundData(): void {
     this.backgrounds$ = this.pinataHttpService.getBackground();
  }
}
