import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
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
    expect(fixture.nativeElement.querySelector('p.title').innerText).toEqual(
      'test title'
    );
  });

  it('should show sub title', () => {
    component.subTitles = ['sub title'];
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('p.sub-title').innerText
    ).toEqual('sub title\n');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
