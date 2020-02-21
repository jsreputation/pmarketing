import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show test title', () => {
    component.title = 'test title';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('strong').textContent).toContain(
      'test title'
    );
  });

  it('should show sub title not to be null', () => {
    component.subTitle = 'sub-title';
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelectorAll('p:nth-of-type(2)')
    ).not.toBeNull();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
