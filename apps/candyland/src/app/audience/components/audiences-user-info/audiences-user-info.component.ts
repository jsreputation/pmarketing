import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';

@Component({
  selector: 'cl-audiences-user-info',
  templateUrl: './audiences-user-info.component.html',
  styleUrls: ['./audiences-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AudiencesUserInfoComponent implements OnInit {

  public user: any;
  constructor( private audiencesUserService: AudiencesUserService,
               public activateRoute: ActivatedRoute,
               private cd: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.getUserInfo();
  }

  public getUserInfo(): void {
    const id = this.activateRoute.snapshot.params.id;
    this.audiencesUserService.getUser(id).subscribe((res: any[]) => {
      this.user = res;
      this.cd.detectChanges();
    });
  }
}
