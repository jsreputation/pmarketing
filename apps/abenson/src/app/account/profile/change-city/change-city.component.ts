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
  selector: 'app-change-city',
  templateUrl: './change-city.component.html',
  styleUrls: ['./change-city.component.scss']
})
export class ChangeCityComponent implements OnInit {
  public cityChangeForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.cityChangeForm = this.fb.group({
      newCity: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    // @TODO: req
  }
}
