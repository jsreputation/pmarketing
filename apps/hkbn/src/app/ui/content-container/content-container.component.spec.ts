import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentContainerComponent } from './content-container.component';
import { HeaderModule } from '../header/header.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService, ProfileService } from '@perx/core';
import { of } from 'rxjs';

describe('ContentContainerComponent', () => {
  let component: ContentContainerComponent;
  let fixture: ComponentFixture<ContentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HeaderModule, RouterTestingModule, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {provide: AuthenticationService, useValue: {}},
        {provide: ProfileService, useValue: {whoAmI: () => of(true)}}
      ],
      declarations: [ContentContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
