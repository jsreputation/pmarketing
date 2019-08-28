import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AudiencesService } from '@cl-core-services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cl-audiences-user-info',
  templateUrl: './audiences-user-info.component.html',
  styleUrls: ['./audiences-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AudiencesUserInfoComponent implements OnInit {

  public user: any;
  constructor( private audiencesService: AudiencesService,
               public activateRoute: ActivatedRoute,
               private cd: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.getUserInfo();
  }

  public getUserInfo(): void {
    const id = this.activateRoute.snapshot.params.id;
    this.audiencesService.getUser(id).subscribe((res: any[]) => {
      this.user = res;
      this.cd.detectChanges();
    });
  }
}
