import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'hkbn-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent {

  public updateEmailGroup: FormGroup = new FormGroup({
    email: new FormControl()
  });

}
