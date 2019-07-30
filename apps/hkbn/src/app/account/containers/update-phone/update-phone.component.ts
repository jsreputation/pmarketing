import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Mask } from '../../../helpers/mask';

@Component({
  selector: 'hkbn-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.scss']
})
export class UpdatePhoneComponent {

  public phoneMask: any = Mask.PHONE_WITHOUT_EXT;

  public updatePhoneGroup: FormGroup = new FormGroup({
    phone: new FormControl()
  });
}
