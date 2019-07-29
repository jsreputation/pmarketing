import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
export class QrscannerComponent implements OnInit {

  public ngOnInit(): void {
  }

  public scanSuccessHandler(event: string): void {
    console.log(event);
  }

}
