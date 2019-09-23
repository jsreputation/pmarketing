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
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  public emailChangeForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.emailChangeForm = this.fb.group({
      newEmail: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    // @TODO: req
  }
}
