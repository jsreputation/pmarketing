import { Component, OnInit, ViewRef, ComponentRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService, AuthenticationService } from '@perx/core';
import { DynamicCreateService } from '../shared/service/dynamic-create.service';
import { DetailAgreementComponent } from '../details/detail-agreement/detail-agreement.component';
import { Router } from '@angular/router';
import { RedeemComponent } from './redeem/redeem.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public personalData: FormGroup;

  constructor(
    private buildForm: FormBuilder,
    private personalProfile: ProfileService,
    private dynamicCreateService: DynamicCreateService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.personalData = this.buildForm.group({
      name: '',
      password: ''
    });
    this.personalProfile.whoAmI()
      .pipe(
        take(1)
      )
      .subscribe(profile => {
        this.personalData.setValue({
          name: profile.lastName,
          password: profile.customProperties.last_4
        });
      });
  }

  public displayAgreement(): void {
    const comp = this.dynamicCreateService.createComponent<DetailAgreementComponent>(DetailAgreementComponent);
    this.closeModal(comp);
  }

  public displayReedemReward(): void {
    const comp = this.dynamicCreateService.createComponent<RedeemComponent>(RedeemComponent);
    this.closeModal(comp);
  }

  public closeModal(comp: ComponentRef<any>): void {
    comp.instance.closeModal.subscribe(() => {
      this.dynamicCreateService.removeComponent(comp);
    });
  }

  public logOut(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
