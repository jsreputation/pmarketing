import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PrimaryCatalogComponent } from './primary-catalog/primary-catalog.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainRoutingModule } from '../main-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FeatureDealsComponent } from './featured-deals/featured-deals.component';
import { SecondaryCatalogComponent } from './secondary-catalog/secondary-catalog.component';
import { MatIconModule } from '@angular/material/icon';
import { TaggedItemComponent } from '../../shared/components/tagged-item/tagged-item.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RewardsService } from '@perxtech/core';
class MockRouter {
  navigate() {

  }
}

class MockRewardService {
  getRewards() {
    return of();
  }
}
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        PrimaryCatalogComponent,
        SecondaryCatalogComponent,
        FeatureDealsComponent,
        TaggedItemComponent
      ],
      imports: [
        MainRoutingModule,
        MatSidenavModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule
      ],
      providers:[
        {provide:Router, useClass: MockRouter},
        {provide:RewardsService, useClass: MockRewardService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
