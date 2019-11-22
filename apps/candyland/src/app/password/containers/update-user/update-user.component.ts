import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public routeEnd: string;
  public hide: boolean = true;

  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.routeEnd = this.router.url.slice(10); // start after password/
  }

}
