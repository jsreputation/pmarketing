import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { DetailHeaderComponent } from './detail-header.component';
import { By } from '@angular/platform-browser';
import { ExpectedConditions } from 'protractor';

describe('DetailHeaderComponent', () => {
  let component: DetailHeaderComponent;
  let fixture: ComponentFixture<DetailHeaderComponent>;
  let debugElement: DebugElement
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailHeaderComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud have default image', ()=>{
    const element = debugElement.query(By.css('img')).nativeElement;
    expect(element.getAttribute('src')).toBe('assets/img/back.svg')
  });

  it('should have image from input', ()=>{
    const url = 'assets/img/some-other-src.svg'
    component.customBackButton = url;
    fixture.detectChanges();
    const element = debugElement.query(By.css('img')).nativeElement;
    expect(element.getAttribute('src')).toBe(url);
  })
});
