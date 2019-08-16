import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'cl-new-reward',
  templateUrl: './new-reward.component.html',
  styleUrls: ['./new-reward.component.scss']
})
export class NewRewardComponent implements OnInit {
  public form: FormGroup;
  public config: OptionConfig[];

  constructor(private router: Router) {
  }

  public ngOnInit(): void {
  }

  public handlerCancel(): void {
    this.router.navigateByUrl('/rewards');
  }
  // TODO: passed data variable it is present data from reward form
  public handlerSave(): void {
    this.router.navigateByUrl('/rewards/detail/');
  }

}
