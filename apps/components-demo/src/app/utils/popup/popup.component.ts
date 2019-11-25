import { Component } from '@angular/core';
import { NotificationService } from '@perx/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { CustomValidators } from './customValidator';

interface FormProperties {
  title: string;
  text: string;
  disableOverlay: boolean;
  btnTxt: string;
  btnTxt2: string;
  imageUrl: string;
}

// type FormProperties = 'title'| 'text' | 'disableOverlay' | 'btnTxt' | 'btnTxt2' | 'imageUrl';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  public form: FormGroup;

  public get title(): AbstractControl | null {
    return this.form.get('title');
  }

  public get text(): AbstractControl | null {
    return this.form.get('text');
  }

  public get btnTxt(): AbstractControl | null {
    return this.form.get('btnTxt');
  }

  public get btnTxt2(): AbstractControl | null {
    return this.form.get('btnTxt2');
  }

  constructor(private notificationService: NotificationService, private fb: FormBuilder) {

    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      btnTxt: ['', [Validators.required, Validators.maxLength(10)]],
      btnTxt2: ['', [Validators.required, Validators.maxLength(10)]],
      disableOverlay: [''],
      imageUrl: ['https://picsum.photos/300/300', [Validators.required, CustomValidators.urlValidator]],
    });
  }
  public onSubmit({title, text, disableOverlay, btnTxt, btnTxt2, imageUrl}: FormProperties): void {
    this.notificationService.addPopup({
      title,
      text,
      imageUrl,
      buttonTxt: btnTxt,
      disableOverlayClose: disableOverlay,
      buttonTxt2: btnTxt2
    });
  }

}
