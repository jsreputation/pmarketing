import { Component } from '@angular/core';
import { NotificationService } from '@perx/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  public form: FormGroup;

  public get title(): AbstractControl {
    return this.form.get('title');
  }

  public get text(): AbstractControl {
    return this.form.get('text');
  }

  public get btnTxt(): AbstractControl {
    return this.form.get('btnTxt');
  }

  public get btnTxt2(): AbstractControl {
    return this.form.get('btnTxt2');
  }

  constructor(private notificationService: NotificationService, private fb: FormBuilder) {
    const regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      btnTxt: ['', [Validators.required, Validators.maxLength(10)]],
      btnTxt2: ['', [Validators.required, Validators.maxLength(10)]],
      disableOverlay: [''],
      imageUrl: ['https://picsum.photos/300/300', [Validators.required, Validators.pattern(regexp)]],
    });
  }
  public onSubmit({title, text, disableOverlay, btnTxt, btnTxt2, imageUrl}: any): void {
    // open model
    // pass in modal data
    console.log(disableOverlay);
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
