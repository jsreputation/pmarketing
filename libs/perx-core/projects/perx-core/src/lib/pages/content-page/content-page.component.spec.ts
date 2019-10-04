import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPageComponent } from './content-page.component';
import { ThemesService } from '../../utils/themes/themes.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ContentPageComponent', () => {
  let component: ContentPageComponent;
  let fixture: ComponentFixture<ContentPageComponent>;
  const themeSvcStub = {
    getAccountSettings: () => of()
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPageComponent ],
      providers: [
        { provide: ThemesService, useValue: themeSvcStub },
        { provide: ActivatedRoute, useValue: { params: of()}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
