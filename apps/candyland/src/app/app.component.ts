import { Component, OnInit } from '@angular/core';
import { AuthService, RoutingStateService } from '@cl-core/services';
import { UserService } from '@cl-core/services/user.service';
import { LocalStorageService } from '@cl-core/services/local-storage.service';

@Component({
  selector: 'cl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private routingState: RoutingStateService,
    public authService: AuthService,
    private userService: UserService,
    private localStorage: LocalStorageService
  ) {
  }

  public ngOnInit(): void {
    this.authService.initAuth();
    const userId = this.userService.userId || this.localStorage.get('userId');
    if (userId) {
      this.authService.updateUser()
        .subscribe(() => {
        });
    }
    this.routingState.loadRouting()
      .subscribe(() => {
      });
  }
}
