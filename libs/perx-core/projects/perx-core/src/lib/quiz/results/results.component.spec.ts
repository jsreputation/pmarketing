import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { ResultsComponent } from './results.component';
import { SecondsToStringPipe } from '../seconds-to-string.pipe';
import { TranslateModule } from '@ngx-translate/core';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsComponent,
        SecondsToStringPipe
      ],
      imports: [
        MatListModule,
        MatIconModule,
        TranslateModule.forRoot()
      ],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
