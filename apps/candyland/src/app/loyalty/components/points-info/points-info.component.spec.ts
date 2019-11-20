import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PointsInfoComponent } from './points-info.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PointsInfoComponent', () => {
  let component: PointsInfoComponent;
  let fixture: ComponentFixture<PointsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [PointsInfoComponent],
        imports: [TranslateModule.forRoot()],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
