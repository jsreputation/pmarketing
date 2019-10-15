import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCollectionComponent } from './games-collection.component';
import { MatCardModule } from '@angular/material';

describe('GamesCollectionComponent', () => {
  let component: GamesCollectionComponent;
  let fixture: ComponentFixture<GamesCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesCollectionComponent ],
      imports: [
        MatCardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
