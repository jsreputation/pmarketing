import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainRoutingModule } from '../../../main/main-routing.module';
import { SearchResultComponent } from './search-result.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared.module';
import { Router } from '@angular/router';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  const routerBdo: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchResultComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MainRoutingModule,
        SharedModule,
        MatTabsModule
      ],
      providers:[
        {provide: Router, useValue:routerBdo}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
