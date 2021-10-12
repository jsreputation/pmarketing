import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { CategoryComponent } from './category.component';
// import {MatSelectModule} from '@angular/material/select';
// import { MatExpansionModule } from '@angular/material/expansion';

// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SortComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CategoryComponent
      ],
      imports: [
        // MatSelectModule,
        // BrowserAnimationsModule,
        // MatToolbarModule,
        // MatSidenavModule,
        // MatExpansionModule,
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
