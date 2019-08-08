import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShakeComponent } from './shake.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PerxCoreModule, GameModule, ProfileModule, CognitoModule, OauthModule } from '@perx/core';
import { environment } from '../../../environments/environment';

describe('ShakeComponent', () => {
  let component: ShakeComponent;
  let fixture: ComponentFixture<ShakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShakeComponent],
      imports: [
        RouterTestingModule,
        PerxCoreModule,
        GameModule.forRoot({ env: environment }),
        ProfileModule.forRoot({ env: environment }),
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
