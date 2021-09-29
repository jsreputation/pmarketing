import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'perx-bcm-pages-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
export class QrscannerComponent implements OnInit, OnChanges {
  private path: string;

  @Input()
  public enableScan: boolean = true;
  public startScan: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.path = params.path;
    });
    setTimeout(() => this.startScan = this.enableScan, 300);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.enableScan.firstChange) {
      this.startScan = changes.enableScan.currentValue;
    }
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

  public onCancel(): void {
    this.router.navigate(['/home']);
  }

}
