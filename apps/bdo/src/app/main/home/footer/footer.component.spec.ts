import { RewardsService } from '@perxtech/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainRoutingModule } from '../../main-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { TaggedItemComponent } from '../../../shared/components/tagged-item/tagged-item.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FooterComponent } from './footer.component';
class MockRewardsService {
 getRewards() {
   return of();
 }
}
class MockRouter {
  navigate() {}
}
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FooterComponent,
        TaggedItemComponent
      ],
      imports: [
        MainRoutingModule,
        MatSidenavModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule
      ],
      providers:[{provide: RewardsService, useClass: MockRewardsService},
        {provide: Router, useClass: MockRouter}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
