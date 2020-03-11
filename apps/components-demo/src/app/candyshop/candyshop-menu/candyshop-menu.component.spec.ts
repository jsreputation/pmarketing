import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyshopMenuComponent } from './candyshop-menu.component';
import { SidenavMenuModule, SidenavModule } from '@perxtech/candyshop';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('CandyshopMenuComponent', () => {
  let component: CandyshopMenuComponent;
  let fixture: ComponentFixture<CandyshopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandyshopMenuComponent],
      imports: [
        SidenavMenuModule,
        SidenavModule,
        NoopAnimationsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandyshopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
