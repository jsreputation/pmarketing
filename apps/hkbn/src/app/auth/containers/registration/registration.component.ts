import { Component } from '@angular/core';

@Component({
  selector: 'hkbn-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  /* istanbul ignore next */
  public submitHandler(data: any): void {
    console.log(data);
  }

}
