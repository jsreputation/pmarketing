import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
// import { AuthService, MessageService } from '@es-core';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public routeEnd: string;
  public hide: boolean = true;
  // private token: string;

  constructor(
    private router: Router,
    // private authService: AuthService,
    // private messageService: MessageService
  ) {
  }

  public ngOnInit(): void {
    const urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const urlTreeSegments = oc(urlTree).root.children.primary.segments([]);
    this.routeEnd = urlTreeSegments.length > 0 ? urlTreeSegments[urlTreeSegments.length - 1].path : '';
    // this.token = oc(urlTree).queryParams.reset_password_token();
  }

  public submit(password: string): void {
    console.log(password);
    // this.authService.changePassword(password, this.token).subscribe(
    //   (res) => {
    //     if (res) {
    //       this.messageService.show('Success, you are login', 'warning');
    //       this.router.navigate(['/']);
    //     } else {
    //       this.messageService.show('Something went wrong, you can try login again', 'warning');
    //       this.router.navigate(['/login']);
    //     }
    //   },
    //   () => this.messageService.show('It appears that this reset link has already been used or expired, please try again!', 'warning')
    // );
  }
}
