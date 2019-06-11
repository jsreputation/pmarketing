import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activation-code',
  templateUrl: './activation-code.component.html',
  styleUrls: ['./activation-code.component.scss']
})
export class ActivationCodeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pinInput(event: string): void {
    console.log('go to redemption');
    this.router.navigate(['/redemption']);
  }
}
