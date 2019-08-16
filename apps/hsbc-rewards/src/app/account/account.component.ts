import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService, AuthenticationService } from '@perx/core';
import { DynamicCreateService } from '../shared/service/dynamic-create.service';
import { DetailAgreementComponent } from '../details/detail-agreement/detail-agreement.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  private personalData: FormGroup;
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
    this.personalProfile.whoAmI().subscribe((result) => {
      this.personalData.setValue({
        name: result.customProperties.fname,
        password: result.customProperties.password
      });
    });

  }
  public displayAgreement(): void {
    const comp = this.dynamicCreateService.createComponent<DetailAgreementComponent>(DetailAgreementComponent);
    comp.instance.closeModal.subscribe(() => {
      this.dynamicCreateService.removeComponent(comp);
    });
  }

  public logOut(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
