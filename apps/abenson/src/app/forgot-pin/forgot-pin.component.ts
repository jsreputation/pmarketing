import {
  Component,
  OnInit
} from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.component.html',
  styleUrls: ['./forgot-pin.component.scss']
})
export class ForgotPinComponent implements OnInit {
  public forgotPinForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(): void {
  }
}
