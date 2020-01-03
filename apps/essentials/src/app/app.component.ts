import { Component, OnInit } from '@angular/core';
import { AuthService } from '@es-core';

@Component({
  selector: 'es-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
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
  }
}
