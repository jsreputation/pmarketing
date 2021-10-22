import { MapComponent } from './map.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TaggedItemComponent } from '../../../shared/components/tagged-item/tagged-item.component';
import { IVoucherService, RewardsService } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  const rewardsServiceStub: Partial<RewardsService> = {
  };
  const vouchersServiceStub: Partial<IVoucherService> = {
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MapComponent,
        TaggedItemComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTabsModule,
        MatIconModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        },
        {
          provide: RewardsService, useValue:rewardsServiceStub
        },
        {
          provide: IVoucherService, useValue:vouchersServiceStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
