import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  MatIconModule,
  MatCardModule,
} from '@angular/material';

import { of } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { RewardsService } from '@perx/core';

import { catalogs } from 'src/app/catalogs.mock';
import { CatalogsComponent } from './catalogs.component';

describe('CatalogsComponent', () => {
  let component: CatalogsComponent;
  let fixture: ComponentFixture<CatalogsComponent>;
  const catalogsServiceStub = {
    getCatalogs: () => of(catalogs),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsComponent ],
      imports: [
        MatIconModule,
        MatCardModule,
        InfiniteScrollModule,
      ],
      providers: [
        { provide: RewardsService, useValue: catalogsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get catalogs from getCatalogs', () => {
    component.catalogs$.subscribe(res => {
      expect(res[0].id).toBe(0);
      expect(res[0].name).toBe('Ramadan Exclusive');
      expect(res[0].description).toBe('Here are deals for ramadan');
      expect(res[0].rewardCount).toBe(5);

      expect(res[1].id).toBe(1);
      expect(res[1].name).toBe('Christmas Specials');
      expect(res[1].description).toBe('Santa-claus latest and greatest');
      expect(res[1].rewardCount).toBe(25);
    });
  });

  it('should emit tap with selected catalog', () => {
    const catalog = catalogs[0];
    spyOn(component.tapped, 'emit');
    component.selected(catalog);
    expect(component.tapped.emit).toHaveBeenCalledWith(catalog);
  });
});
