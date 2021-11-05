import { MapComponent } from './map/map.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { NearbyDealsComponent } from './nearby-deals.component';
import { MatIconModule } from '@angular/material/icon';
import { TaggedItemComponent } from '../../shared/components/tagged-item/tagged-item.component';
import { ICategoryTags, IVoucherService, RewardsService } from '@perxtech/core';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

const rewardServiceStub: Partial<RewardsService> = {
  nearMe: () => of([]),
  getAllCategories: (): Observable<ICategoryTags[]> => of([])
};

class MockIVoucherService {

}
describe('NearbyDealsComponent', () => {
  let component: NearbyDealsComponent;
  let fixture: ComponentFixture<NearbyDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NearbyDealsComponent,
        MapComponent,
        TaggedItemComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        MatToolbarModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        }, {
          provide: RewardsService, useValue: rewardServiceStub
        },
        {
          provide: IVoucherService, useClass:MockIVoucherService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
