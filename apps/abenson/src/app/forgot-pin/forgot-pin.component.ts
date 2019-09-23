import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.component.html',
  styleUrls: ['./forgot-pin.component.scss']
})
export class ForgotPinComponent implements OnInit {
  public forgotPinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.forgotPinForm = this.fb.group({
      mobileNumber: ['', Validators.required]
    });
  }

  public onSubmit(): void {
  }
}
