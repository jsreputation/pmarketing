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
  selector: 'app-existing-card',
  templateUrl: './existing-card.component.html',
  styleUrls: ['./existing-card.component.scss']
})
export class ExistingCardComponent implements OnInit {
  public existingCardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.existingCardForm = this.fb.group({
      cardNumber: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    // @TODO: req, existing card number
  }
}
