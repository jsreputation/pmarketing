import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit {
  public styles: ISimplValue = [
    {
      id: 1,
      value: 'Light'
    },
    {
      id: 2,
      value: 'Dark'
    }
  ];
  public fonts: ISimplValue = [
    {
      id: 1,
      value: 'Roboto'
    },
    {
      id: 2,
      value: 'Lato'
    }
  ];
  public formBranding: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createFormBranding();
  }

  private createFormBranding(): void {
    this.formBranding = this.fb.group({
      style: [null],
      font: [null],
      });
  }

}
