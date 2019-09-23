import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-barangay',
  templateUrl: './change-barangay.component.html',
  styleUrls: ['./change-barangay.component.scss']
})
export class ChangeBarangayComponent implements OnInit {
  public barangayChangeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
  this.barangayChangeForm = this.fb.group({
    newBarangay: ['', Validators.required],
  });
}
}
