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
        MatToolbarModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTabsModule,
        MatIconModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
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