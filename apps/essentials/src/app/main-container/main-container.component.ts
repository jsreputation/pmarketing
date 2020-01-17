import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService, UserService } from '@es-core';
import { Observable } from 'rxjs';
import { IAMUser } from '@es-core/models/auth/IAMUser.interface';

@Component({
  selector: 'es-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  public get user$(): Observable<IAMUser | null> {
    return this.userService.user$;
  }

  public handleLogout(): void {
    this.authService.logout();
  }

}
