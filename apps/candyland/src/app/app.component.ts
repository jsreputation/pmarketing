import { Component, OnInit } from '@angular/core';
import { AuthService, RoutingStateService } from '@cl-core/services';
import { TenantService } from '@cl-core/services/tenant.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private routingState: RoutingStateService,
    public authService: AuthService,
    private tenantService: TenantService
  ) {
  }

  public ngOnInit(): void {
    console.log(this.authService);
    if (!this.authService) {
      return;
    }
    this.authService.initAuth();
    if (this.authService.userId) {
      this.authService.updateUser()
        .pipe(
          switchMap(() => this.tenantService.getSettings()),
        )
        .subscribe(() => {
        });
    }

    this.routingState.loadRouting() // what does this do?
      .subscribe(() => {
      });
  }
}
