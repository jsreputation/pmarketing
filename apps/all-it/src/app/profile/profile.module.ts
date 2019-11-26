import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule, MatIconModule } from '@angular/material';
import { ProfileService, IProfile } from '@perx/core';
import { Observable, of } from 'rxjs';

const mockProfileResponse: IProfile = {
  email: 'perx@gmail.com',
  firstName: null,
  gender: null,
  id: 59431,
  identifier: 'PERX',
  joinedDate: '2019-07-01T03:37:50.049Z',
  lastName: 'PERX',
  middleName: null,
  passwordExpiryDate: null,
  phone: '123456',
  state: 'active',
  birthDate: new Date(),
  customProperties: {
    postcode: 1234,
    membershipExpiryDate: '2019-12-26T03:37:50.049Z'
  }
};

const profileServiceStub = {
  whoAmI: (): Observable<IProfile> => of(mockProfileResponse)
};

const routes: Routes = [{
  path: '',
  component: ProfileComponent
}];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: ProfileService, useValue: profileServiceStub }
  ]
})
export class ProfileModule { }
