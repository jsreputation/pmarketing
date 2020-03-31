import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-candyshop-file-uploader',
  templateUrl: './candyshop-file-uploader.component.html',
  styleUrls: ['./candyshop-file-uploader.component.scss']
})
export class CandyshopFileUploaderComponent {
  public control1: FormControl = new FormControl(null, Validators.required);
  public control2: FormControl = new FormControl(null, Validators.required);
  public disabled: boolean = false;

  public log(message: any): void {
    alert(message);
  }

}
