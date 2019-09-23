import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-street-address',
  templateUrl: './change-street-address.component.html',
  styleUrls: ['./change-street-address.component.scss']
})
export class ChangeStreetAddressComponent implements OnInit {
  public streetAddressChangeForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.streetAddressChangeForm = this.fb.group({
      newStreetAddress: ['', Validators.required],
    });
  }
}
