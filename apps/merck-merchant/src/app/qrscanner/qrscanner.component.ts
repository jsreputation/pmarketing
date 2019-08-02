import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
export class QrscannerComponent implements OnInit {
  private path: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.path = params[`path`];
    });
  }

  public scanSuccessHandler(data: string): void {
    if ( !data ) {
      return;
    }
    const navigationExtras: NavigationExtras = {
      state: {
        data
      }
    };
    this.router.navigate([`${this.path}`], navigationExtras);
  }

}
