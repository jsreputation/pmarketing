import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.scss']
})
export class CommunicationsComponent implements OnInit {
  public formCommunications: FormGroup;
  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.createFormCommunications();
  }

  public get smsDisable(): AbstractControl {
    return this.formCommunications.get('smsDisable');
  }

  public get emailDisable(): AbstractControl {
    return this.formCommunications.get('emailDisable');
  }

  public get smsType(): AbstractControl {
    return this.formCommunications.get('smsType');
  }

  private createFormCommunications(): void {
    this.formCommunications = this.fb.group({
      smsType: ['perx'],
      smsDisable: [false],
      smsContent: [null],
      emailType: [null],
      emailDisable: [false]
    });
  }

}
