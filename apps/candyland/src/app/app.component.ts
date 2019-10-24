import { Component, OnInit } from '@angular/core';
import { AuthService, RoutingStateService } from '@cl-core/services';

@Component({
  selector: 'cl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private routingState: RoutingStateService,
    public authService: AuthService,
  ) {
  }

  public ngOnInit(): void {
    this.authService.initAuth();
    if (this.authService.userId) {
      this.authService.updateUser()
        .subscribe(() => {
        });
    }

    this.routingState.loadRouting()
      .subscribe(() => {
      });
  }
}
