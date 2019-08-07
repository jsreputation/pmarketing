import { Component, OnInit } from '@angular/core';
import { RoutingStateService } from '@cl-core/services/routing-state.service';

@Component({
  selector: 'cl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private routingState: RoutingStateService) { }

  public ngOnInit(): void {
    this.routingState.loadRouting()
      .subscribe(() => { });
  }
}
