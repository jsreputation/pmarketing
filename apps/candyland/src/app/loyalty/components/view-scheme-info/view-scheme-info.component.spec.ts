import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ViewSchemeInfoComponent } from './view-scheme-info.component';
import { PipesModule } from '@cl-shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

describe('ViewSchemeInfoComponent', () => {
  let component: ViewSchemeInfoComponent;
  let fixture: ComponentFixture<ViewSchemeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PipesModule,
        TranslateModule.forRoot()
      ],
      declarations: [ViewSchemeInfoComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSchemeInfoComponent);
    component = fixture.componentInstance;
    component.loyalty = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
