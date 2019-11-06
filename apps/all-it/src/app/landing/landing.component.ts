import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  public title: string = 'Title';
  public subTitle: string = 'Subtitle';

  constructor( private router: Router) { }

  public onLogin(): void {
    this.router.navigateByUrl('/signin');
  }

  public onSignUp(): void {
    console.log('Sign Up clicked');
  }
}
