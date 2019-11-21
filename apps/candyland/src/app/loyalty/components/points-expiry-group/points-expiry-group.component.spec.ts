import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PointsExpiryGroupComponent } from './points-expiry-group.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PointsExpiryGroupComponent', () => {
  let component: PointsExpiryGroupComponent;
  let fixture: ComponentFixture<PointsExpiryGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [PointsExpiryGroupComponent],
        imports: [TranslateModule.forRoot()],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsExpiryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
